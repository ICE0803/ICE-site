import { downloadNotionImage, getNotionImageBlock } from "@/lib/notion"
import { NotionImageConfigError, NotionImageUploadError, syncNotionImage } from "@/lib/notion-images"

const imageTypes = new Set(["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"])
const maxImageBytes = 10 * 1024 * 1024
const blockIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const defaultAllowedHosts = ["prod-files-secure.s3.us-west-2.amazonaws.com", "prod-files-secure.s3.amazonaws.com"]

type ReadResult = { body?: ArrayBuffer; error?: "too-large" | "read-failed" }

function allowedHosts(): Set<string> {
  const configured = process.env.NOTION_FILE_HOSTS?.split(",").map((host) => host.trim().toLowerCase()).filter(Boolean)
  return new Set(configured?.length ? configured : defaultAllowedHosts)
}

function validSource(value: string): URL | undefined {
  try {
    const url = new URL(value)
    if (url.protocol !== "https:" || url.username || url.password || !allowedHosts().has(url.hostname.toLowerCase())) return undefined
    return url
  } catch {
    return undefined
  }
}

async function readLimitedBody(response: Response): Promise<ReadResult> {
  if (!response.body) return { error: "read-failed" }
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > maxImageBytes) {
        await reader.cancel()
        return { error: "too-large" }
      }
      chunks.push(value)
    }
  } catch {
    await reader.cancel().catch(() => undefined)
    return { error: "read-failed" }
  } finally {
    reader.releaseLock()
  }
  const body = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    body.set(chunk, offset)
    offset += chunk.byteLength
  }
  return { body: body.buffer }
}

function failure(status: number): Response {
  return new Response(null, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } })
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!blockIdPattern.test(id)) return failure(400)

  try {
    const block = await getNotionImageBlock(id)
    if (!block) return failure(404)
    if (block.type !== "image") return failure(422)

    const image = block.image as { type?: string; file?: { url?: string } } | undefined
    if (image?.type !== "file") return failure(422)
    const source = typeof image.file?.url === "string" ? validSource(image.file.url) : undefined
    if (!source) return failure(502)

    const upstream = await downloadNotionImage(source.toString())
    if (upstream.status >= 300 && upstream.status < 400) return failure(502)
    if (!upstream.ok) return failure(502)

    const contentType = upstream.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() ?? ""
    if (!imageTypes.has(contentType)) return failure(415)

    const lengthHeader = upstream.headers.get("content-length")
    const declaredLength = lengthHeader === null ? undefined : Number(lengthHeader)
    if (declaredLength !== undefined && Number.isFinite(declaredLength) && declaredLength > maxImageBytes) {
      await upstream.body?.cancel()
      return failure(413)
    }

    const { body, error } = await readLimitedBody(upstream)
    if (error === "too-large") return failure(413)
    if (error || !body) return failure(502)

    const publicUrl = await syncNotionImage({ body, contentType, blockId: id })
    return Response.redirect(publicUrl, 307)
  } catch (error) {
    if (error instanceof NotionImageConfigError) return failure(503)
    if (error instanceof NotionImageUploadError) return failure(502)
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")
    console.error("Notion image proxy failed", { blockId: id, reason: timedOut ? "timeout" : "upstream failure" })
    return failure(timedOut ? 504 : 502)
  }
}

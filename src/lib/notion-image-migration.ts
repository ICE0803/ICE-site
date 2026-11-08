import { createHash, randomUUID } from "node:crypto"
import { lookup } from "node:dns/promises"
import { request } from "node:https"
import { isIP } from "node:net"
import { lstat, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises"
import { dirname, join, resolve, sep } from "node:path"

export type ImageMapEntry = {
  slug: string; path: string; contentType: string; bytes: number; sha256: string
  sourceType: "file" | "external"
}
export type ImageMap = Record<string, ImageMapEntry>
export type ImageSource = { type: string; file?: { url?: string }; external?: { url?: string } }
export type MigrationPage = { post: { pageId: string; slug: string; title: string; published?: boolean }; cover?: ImageSource | null }
export type MigrationBlock = { id: string; type: string; image?: ImageSource; children?: MigrationBlock[]; [key: string]: unknown }
export type MigrationIssue = { title: string; slug: string; blockId: string; reason: string }
export type Download = { body: Buffer; contentType: string }
export type MigrationOptions = {
  root: string; dryRun?: boolean; check?: boolean
  getPages: () => Promise<MigrationPage[]>
  getBlocks: (pageId: string) => Promise<MigrationBlock[]>
  download?: (url: string) => Promise<Download>
}
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024
const extensions: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp", "image/avif": "avif" }
class MigrationError extends Error {}
function fail(reason: string): never { throw new MigrationError(reason) }
function reason(error: unknown): string { return error instanceof MigrationError ? error.message : "Operation failed (details suppressed)" }
export function sha256(body: Buffer): string { return createHash("sha256").update(body).digest("hex") }

export function validateImage(body: Buffer, mime: string): string {
  const type = mime.split(";")[0].trim().toLowerCase()
  if (!body.length || body.length > MAX_IMAGE_BYTES) fail("Image is empty or exceeds 10MB")
  const ascii = (start: number, end: number) => body.toString("ascii", start, end)
  const matches = type === "image/png" ? body.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    : type === "image/jpeg" ? body[0] === 255 && body[1] === 216 && body[2] === 255
    : type === "image/gif" ? ["GIF87a", "GIF89a"].includes(ascii(0, 6))
    : type === "image/webp" ? ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP"
    : type === "image/avif" ? ascii(4, 8) === "ftyp" && body.readUInt32BE(0) >= 16 && body.readUInt32BE(0) <= body.length && Array.from({ length: Math.max(0, (body.readUInt32BE(0) - 16) / 4) + 1 }, (_, i) => ascii(i === 0 ? 8 : 12 + i * 4, i === 0 ? 12 : 16 + i * 4)).some((brand) => brand === "avif" || brand === "avis")
    : false
  if (!matches) fail("Unsupported MIME or image signature mismatch")
  return type
}

// Reject non-global ranges, including IPv4-mapped IPv6 and transition networks.
export function isPublicAddress(address: string): boolean {
  if (isIP(address) === 4) {
    const [a, b, c] = address.split(".").map(Number)
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 168 || b === 0 || (b === 88 && c === 99))) || (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) || (a === 203 && b === 0 && c === 113))
  }
  if (isIP(address) !== 6) return false
  const words = address.toLowerCase().split(":")
  const first = parseInt(words[0], 16)
  const second = parseInt(words[1] || "0", 16)
  return first >= 0x2000 && first <= 0x3fff && !(first === 0x2001 && (second < 0x200 || second === 0xdb8)) && first !== 0x2002 && first !== 0x3fff
}
export function validateImageUrl(raw: string): URL {
  let url: URL
  try { url = new URL(raw) } catch { return fail("Invalid image URL") }
  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase().replace(/\.$/, "")
  if (url.protocol !== "https:" || url.username || url.password || (url.port && url.port !== "443")) fail("Image URL must use HTTPS without credentials or custom ports")
  if (!host || host === "localhost" || host.endsWith(".localhost") || !host.includes(".") && !isIP(host) || /\.(local|internal|home|lan|test|invalid)$/.test(host) || (isIP(host) && !isPublicAddress(host))) fail("Image host is not public")
  return url
}
export async function downloadImage(raw: string, timeoutMs = 120_000): Promise<Download> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    let url = validateImageUrl(raw)
    for (let hop = 0; hop <= 5; hop++) {
      const host = url.hostname.replace(/^\[|\]$/g, "")
      const addresses = await Promise.race([
        lookup(host, { all: true }),
        new Promise<never>((_, reject) => {
          if (controller.signal.aborted) reject(new MigrationError("Image download timed out"))
          else controller.signal.addEventListener("abort", () => reject(new MigrationError("Image download timed out")), { once: true })
        }),
      ])
      if (!addresses.length || addresses.some(({ address }) => !isPublicAddress(address))) fail("Image DNS resolves to a non-public address")
      const pinned = addresses[0]
      const result = await new Promise<Download | URL>((accept, reject) => {
        const req = request(url, {
          signal: controller.signal,
          family: pinned.family,
          // Pin the validated DNS answer to prevent DNS rebinding. Never send Notion headers.
          lookup: (_hostname, _options, callback) => callback(null, pinned.address, pinned.family),
          headers: { Accept: "image/png,image/jpeg,image/gif,image/webp,image/avif", "Accept-Encoding": "identity" },
        }, (res) => {
          if ([301,302,303,307,308].includes(res.statusCode ?? 0)) {
            res.destroy()
            try {
              if (!res.headers.location || hop === 5) fail("Image redirect limit or missing location")
              accept(validateImageUrl(new URL(res.headers.location, url).href))
            } catch { reject(new MigrationError("Unsafe or invalid image redirect")) }
            return
          }
          if (res.statusCode !== 200) { res.destroy(); reject(new MigrationError("Image HTTP request failed")); return }
          if (Number(res.headers["content-length"]) > MAX_IMAGE_BYTES || (res.headers["content-encoding"] && res.headers["content-encoding"] !== "identity")) {
            res.destroy(); reject(new MigrationError("Image exceeds 10MB or uses unsupported encoding")); return
          }
          const chunks: Buffer[] = []
          let size = 0
          res.on("data", (chunk: Buffer) => {
            size += chunk.length
            if (size > MAX_IMAGE_BYTES) { res.destroy(); reject(new MigrationError("Image exceeds 10MB")) } else chunks.push(chunk)
          })
          res.on("error", reject)
          res.on("end", () => {
            try { const body = Buffer.concat(chunks); accept({ body, contentType: validateImage(body, String(res.headers["content-type"] ?? "")) }) } catch (error) { reject(error) }
          })
        })
        req.on("error", reject)
        req.end()
      })
      if (result instanceof URL) url = result
      else return result
    }
    return fail("Image redirect limit exceeded")
  } catch (error) { throw new MigrationError(controller.signal.aborted ? "Image download timed out" : reason(error)) }
  finally { clearTimeout(timer) }
}

function safeSlug(slug: string): void { if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail("Unsafe slug") }
async function noSymlinks(root: string, target: string): Promise<void> {
  const base = resolve(root)
  if (target !== base && !target.startsWith(base + sep)) fail("Path escapes project root")
  let current = base
  for (const part of ["", ...target.slice(base.length + 1).split(sep).filter(Boolean)]) {
    current = part ? join(current, part) : current
    try { if ((await lstat(current)).isSymbolicLink()) fail("Symlink paths are forbidden") }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error }
  }
}
function mappedPath(root: string, entry: ImageMapEntry): string {
  safeSlug(entry.slug)
  if (!new RegExp(`^/blog/${entry.slug}/[a-zA-Z0-9_-]+\\.(png|jpg|gif|webp|avif)$`).test(entry.path)) fail("Unsafe mapped path")
  return resolve(root, "public", entry.path.slice(1))
}
async function readMap(root: string): Promise<ImageMap> {
  const file = resolve(root, "src/data/notion-image-map.json")
  await noSymlinks(root, file)
  let value: unknown
  try { value = JSON.parse(await readFile(file, "utf8")) } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return Object.create(null) as ImageMap
    return fail("Cannot read image map")
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) fail("Invalid image map")
  for (const entry of Object.values(value)) {
    if (!entry || typeof entry !== "object" || typeof entry.slug !== "string" || typeof entry.path !== "string" || !extensions[entry.contentType] || !Number.isSafeInteger(entry.bytes) || entry.bytes <= 0 || entry.bytes > MAX_IMAGE_BYTES || !/^[a-f0-9]{64}$/.test(entry.sha256) || !["file", "external"].includes(entry.sourceType)) fail("Invalid image map entry")
    mappedPath(root, entry)
  }
  return Object.assign(Object.create(null), value) as ImageMap
}
async function verifyEntry(root: string, entry: ImageMapEntry): Promise<boolean> {
  const file = mappedPath(root, entry)
  await noSymlinks(root, file)
  let body: Buffer
  try {
    const stat = await lstat(file)
    if (!stat.isFile() || stat.size !== entry.bytes) fail("Existing image size conflict")
    body = await readFile(file)
  } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return false; throw error }
  if (sha256(body) !== entry.sha256) fail("Existing image hash conflict")
  validateImage(body, entry.contentType)
  if (!entry.path.endsWith(`.${extensions[entry.contentType]}`)) fail("Image extension conflicts with MIME")
  return true
}
export async function verifyLocalImages(root: string): Promise<{ checked: number; issues: MigrationIssue[] }> {
  const mapFile = resolve(root, "src/data/notion-image-map.json")
  await noSymlinks(root, mapFile)
  try { await lstat(mapFile) } catch { fail("Image map is missing or inaccessible") }
  const map = await readMap(root)
  const issues: MigrationIssue[] = []
  for (const [blockId, entry] of Object.entries(map)) {
    try { if (!await verifyEntry(root, entry)) fail("Mapped image file is missing") }
    catch (error) { issues.push({ title: "(local map)", slug: entry.slug, blockId, reason: reason(error) }) }
  }
  return { checked: Object.keys(map).length, issues }
}
function imageBlocks(blocks: MigrationBlock[]): MigrationBlock[] {
  const found = new Map<string, MigrationBlock>()
  function visit(items: MigrationBlock[]) {
    for (const block of items) {
      if (block.type === "image") found.set(block.id, block)
      if (Array.isArray(block.children)) visit(block.children)
      const payload = block[block.type] as { children?: MigrationBlock[] } | undefined
      if (Array.isArray(payload?.children)) visit(payload.children)
    }
  }
  visit(blocks)
  return [...found.values()]
}
function filename(raw: string, id: string): string {
  let base = "image"
  try { base = decodeURIComponent(new URL(raw).pathname.split("/").pop() ?? "image").replace(/\.[^.]+$/, "") } catch { /* fallback */ }
  base = base.normalize("NFKD").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70) || "image"
  if (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i.test(base)) base = `image-${base}`
  return id.startsWith("cover:") ? (base === "image" ? "cover" : base) : base
}
export async function migrateNotionImages(options: MigrationOptions): Promise<{ checked: number; downloaded: number; issues: MigrationIssue[] }> {
  const { root } = options
  const map = await readMap(root)
  const original = JSON.stringify(map)
  const issues: MigrationIssue[] = []
  let checked = 0, downloaded = 0
  const pages = await options.getPages()
  const reserved = new Set(Object.values(map).map((entry) => entry.path.toLowerCase()))
  for (const page of pages) {
    if (page.post.published === false) continue
    const { slug, title, pageId } = page.post
    const issue = (blockId: string, error: unknown) => issues.push({ title, slug, blockId, reason: reason(error) })
    let blocks: MigrationBlock[]
    try { safeSlug(slug); blocks = imageBlocks(await options.getBlocks(pageId)) }
    catch (error) { issue("(page)", error); continue }
    const sources = blocks.map((block) => ({ id: block.id, source: block.image }))
    if (page.cover) sources.unshift({ id: `cover:${pageId}`, source: page.cover })
    for (const { id, source } of sources) {
      checked++
      try {
        if (!source || !["file", "external"].includes(source.type)) fail("Unsupported image source")
        const sourceType = source.type as "file" | "external"
        const raw = source[sourceType]?.url
        if (!raw) fail("Image URL is missing")
        const existing = map[id]
        if (existing) {
          if (existing.slug !== slug || existing.sourceType !== sourceType) fail("Existing mapping metadata conflict")
          if (await verifyEntry(root, existing)) continue
        }
        if (options.check) fail(existing ? "Mapped image file is missing" : "Image mapping is missing")
        validateImageUrl(raw)
        if (options.dryRun) continue
        const image = await (options.download ?? downloadImage)(raw)
        const contentType = validateImage(image.body, image.contentType)
        const hash = sha256(image.body)
        if (existing && (existing.sha256 !== hash || existing.bytes !== image.body.length || existing.contentType !== contentType)) fail("Downloaded image hash or metadata conflict")
        let path = existing?.path
        if (!path) {
          const base = filename(raw, id)
          const shortId = createHash("sha256").update(id).digest("hex").slice(0, 10)
          for (let attempt = 0; ; attempt++) {
            const suffix = attempt === 0 ? "" : `-${shortId}${attempt === 1 ? "" : `-${attempt}`}`
            const candidate = `/blog/${slug}/${base}${suffix}.${extensions[contentType]}`
            if (reserved.has(candidate.toLowerCase())) continue
            const target = resolve(root, "public", candidate.slice(1))
            await noSymlinks(root, target)
            try { await lstat(target) } catch (error) {
              if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
              path = candidate; break
            }
          }
        }
        const entry: ImageMapEntry = { slug, path, contentType, bytes: image.body.length, sha256: hash, sourceType }
        const target = mappedPath(root, entry)
        await noSymlinks(root, target)
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, image.body, { flag: "wx" })
        map[id] = entry
        reserved.add(path.toLowerCase())
        downloaded++
      } catch (error) { issue(id, error) }
    }
  }
  if (!options.dryRun && !options.check && JSON.stringify(map) !== original) {
    const destination = resolve(root, "src/data/notion-image-map.json")
    await noSymlinks(root, destination)
    await mkdir(dirname(destination), { recursive: true })
    const temp = `${destination}.${randomUUID()}.tmp`
    try {
      await writeFile(temp, JSON.stringify(Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b))), null, 2) + "\n", { flag: "wx" })
      await rename(temp, destination)
    } finally { await unlink(temp).catch(() => undefined) }
  }
  return { checked, downloaded, issues }
}

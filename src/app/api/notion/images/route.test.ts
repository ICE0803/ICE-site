import assert from "node:assert/strict"
import test from "node:test"
import * as nodeModule from "node:module"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

type ResolveHook = (specifier: string, context: unknown, nextResolve: (specifier: string, context: unknown) => unknown) => unknown
const { registerHooks } = nodeModule as typeof nodeModule & { registerHooks: (hooks: { resolve: ResolveHook }) => void }

registerHooks({
  resolve(specifier: string, context: unknown, nextResolve: (specifier: string, context: unknown) => unknown) {
    if (specifier.startsWith("@/")) return nextResolve(pathToFileURL(resolve("src", `${specifier.slice(2)}.ts`)).href, context)
    return nextResolve(specifier, context)
  },
})

process.env.NOTION_TOKEN = "test-token"
process.env.NOTION_DATABASE_ID = "00000000-0000-4000-8000-000000000000"
process.env.NOTION_FILE_HOSTS = "files.example"

const { GET } = await import("./[id]/route.ts")
const { setNotionImageUploaderForTests } = await import("@/lib/notion-images")
const blockId = "00000000-0000-4000-8000-000000000001"
process.env.COS_SECRET_ID = "secret-id"
process.env.COS_SECRET_KEY = "secret-key"
process.env.COS_BUCKET = "bucket"
process.env.COS_REGION = "region"
process.env.COS_PUBLIC_BASE_URL = "https://cdn.example"
let uploads = 0
setNotionImageUploaderForTests(async () => { uploads += 1 })
let upstreamResponse = new Response(new Uint8Array([1, 2, 3]), { headers: { "content-type": "image/png" } })
let upstreamError: Error | undefined
let notionError: Response | undefined
let block: Record<string, unknown> | undefined = { id: blockId, type: "image", image: { type: "file", file: { url: "https://files.example/image.png?signature=old" } } }
let notionRequests = 0
let imageRequests = 0

globalThis.fetch = async (input) => {
  const url = String(input)
  if (url.includes(`/blocks/${blockId}`)) {
    notionRequests += 1
    if (notionError) return notionError
    if (!block) return new Response(null, { status: 404 })
    return Response.json(block)
  }
  if (url.startsWith("https://files.example/")) {
    imageRequests += 1
    if (upstreamError) throw upstreamError
    return upstreamResponse
  }
  throw new Error(`Unexpected request: ${url}`)
}

const request = new Request(`http://localhost/api/notion/images/${blockId}`)
const params = { params: Promise.resolve({ id: blockId }) }

function setUpstream(body: BodyInit | null, init?: ResponseInit) {
  upstreamResponse = new Response(body, init)
}

test("returns the current Notion file image on each request", async () => {
  const before = notionRequests
  const response = await GET(request, params)
  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), `https://cdn.example/notion-images/${blockId}.png`)
  block = { id: blockId, type: "image", image: { type: "file", file: { url: "https://files.example/image.png?signature=new" } } }
  const next = await GET(request, params)
  assert.equal(next.status, 307)
  assert.equal(notionRequests, before + 2)
  assert.equal(imageRequests, 2)
  assert.equal(uploads, 2)
})

test("maps Notion and upstream failures to gateway errors", async () => {
  notionError = new Response("unavailable", { status: 503 })
  assert.equal((await GET(request, params)).status, 502)
  notionError = undefined
  upstreamError = new Error("network failed")
  assert.equal((await GET(request, params)).status, 502)
  upstreamError = undefined
})

test("maps COS configuration and upload failures", async () => {
  const values = Object.fromEntries([
    "COS_SECRET_ID",
    "COS_SECRET_KEY",
    "COS_BUCKET",
    "COS_REGION",
    "COS_PUBLIC_BASE_URL",
  ].map((key) => [key, process.env[key]]))
  delete process.env.COS_SECRET_KEY
  assert.equal((await GET(request, params)).status, 503)
  Object.assign(process.env, values)

  setNotionImageUploaderForTests(async () => { throw new Error("upload failed") })
  assert.equal((await GET(request, params)).status, 502)
  setNotionImageUploaderForTests(async () => { uploads += 1 })
})

test("maps upstream timeouts to gateway timeout", async () => {
  upstreamError = new DOMException("The operation was aborted", "TimeoutError")
  assert.equal((await GET(request, params)).status, 504)
  upstreamError = undefined
})

test("rejects invalid IDs, missing blocks, non-images and external images", async () => {
  assert.equal((await GET(request, { params: Promise.resolve({ id: "bad" }) })).status, 400)
  block = undefined
  assert.equal((await GET(request, params)).status, 404)
  block = { id: blockId, type: "paragraph" }
  assert.equal((await GET(request, params)).status, 422)
  block = { id: blockId, type: "image", image: { type: "external", external: { url: "https://files.example/image.png" } } }
  assert.equal((await GET(request, params)).status, 422)
  block = { id: blockId, type: "image", image: { type: "file", file: { url: "https://attacker.example/image.png" } } }
  assert.equal((await GET(request, params)).status, 502)
  block = { id: blockId, type: "image", image: { type: "file", file: { url: "http://files.example/image.png" } } }
  assert.equal((await GET(request, params)).status, 502)
  block = { id: blockId, type: "image", image: { type: "file", file: { url: "https://files.example/image.png" } } }
})

test("rejects redirects and unsupported MIME types", async () => {
  setUpstream(null, { status: 302, headers: { location: "https://attacker.example/image.png" } })
  assert.equal((await GET(request, params)).status, 502)
  setUpstream("not an image", { headers: { "content-type": "text/plain" } })
  assert.equal((await GET(request, params)).status, 415)
})

test("limits declared and streamed response sizes", async () => {
  setUpstream("", { headers: { "content-type": "image/png", "content-length": String(10 * 1024 * 1024 + 1) } })
  assert.equal((await GET(request, params)).status, 413)
  const oversized = new Uint8Array(10 * 1024 * 1024 + 1)
  setUpstream(oversized, { headers: { "content-type": "image/png" } })
  assert.equal((await GET(request, params)).status, 413)
})

test("rejects failed image streams", async () => {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array([1]))
      controller.error(new Error("stream failed"))
    },
  })
  upstreamResponse = new Response(body, { headers: { "content-type": "image/png" } })
  assert.equal((await GET(request, params)).status, 502)
})

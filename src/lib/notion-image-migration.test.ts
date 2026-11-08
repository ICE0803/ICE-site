import assert from "node:assert/strict"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import test from "node:test"
import { downloadImage, isPublicAddress, migrateNotionImages, sha256, validateImage, validateImageUrl, verifyLocalImages, type MigrationPage } from "./notion-image-migration.ts"
import { runMigrationCli } from "../../scripts/migrate-notion-images.ts"
import { isDirectRun, registerAliasHooks, safeDiagnostic } from "../../scripts/notion-image-cli-utils.ts"

const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jP9sAAAAASUVORK5CYII=", "base64")
async function fixture() { const root = await mkdtemp(join(tmpdir(), "notion-migration-")); await mkdir(resolve(root, "src/data"), { recursive: true }); await mkdir(resolve(root, "public"), { recursive: true }); return root }
function pageFixture() { return [{ post: { pageId: "page-1", slug: "sample-post", title: "Sample", published: true }, cover: { type: "external", external: { url: "https://images.example/cover.png" } } }] satisfies MigrationPage[] }

test("validates MIME and image magic bytes", () => {
  assert.equal(validateImage(png, "image/png"), "image/png")
  assert.throws(() => validateImage(png, "image/jpeg"), /signature mismatch/)
  assert.throws(() => validateImage(Buffer.alloc(0), "image/png"), /empty/)
})
test("blocks private and non-HTTPS image hosts", () => {
  assert.equal(isPublicAddress("8.8.8.8"), true)
  assert.equal(isPublicAddress("127.0.0.1"), false)
  assert.throws(() => validateImageUrl("http://images.example/a.png"), /HTTPS/)
  assert.throws(() => validateImageUrl("https://localhost/a.png"), /not public/)
  assert.throws(() => validateImageUrl("https://192.168.1.1/a.png"), /not public/)
})
test("dry run does not create a map or assets", async () => {
  const root = await fixture()
  try {
    const result = await migrateNotionImages({ root, dryRun: true, getPages: async () => pageFixture(), getBlocks: async () => [], download: async () => ({ body: png, contentType: "image/png" }) })
    assert.equal(result.downloaded, 0)
    assert.equal(result.issues.length, 0)
    await assert.rejects(readFile(resolve(root, "src/data/notion-image-map.json")))
  } finally { await rm(root, { recursive: true, force: true }) }
})
test("migration writes cover map atomically and verify checks bytes", async () => {
  const root = await fixture()
  try {
    const options = { root, getPages: async () => pageFixture(), getBlocks: async () => [], download: async () => ({ body: png, contentType: "image/png" }) }
    assert.equal((await migrateNotionImages(options)).downloaded, 1)
    const map = JSON.parse(await readFile(resolve(root, "src/data/notion-image-map.json"), "utf8"))
    assert.equal(map["cover:page-1"].path, "/blog/sample-post/cover.png")
    assert.equal(map["cover:page-1"].sha256, sha256(png))
    assert.deepEqual((await verifyLocalImages(root)).issues, [])
    assert.equal((await migrateNotionImages(options)).downloaded, 0)
    const beforeConflict = await readFile(resolve(root, "src/data/notion-image-map.json"), "utf8")
    const corrupted = Buffer.from(png)
    corrupted[corrupted.length - 1] ^= 1
    await writeFile(resolve(root, "public/blog/sample-post/cover.png"), corrupted)
    assert.match((await migrateNotionImages(options)).issues[0].reason, /hash conflict/)
    assert.equal(await readFile(resolve(root, "src/data/notion-image-map.json"), "utf8"), beforeConflict)
    await writeFile(resolve(root, "public/blog/sample-post/cover.png"), Buffer.from("changed"))
    assert.match((await verifyLocalImages(root)).issues[0].reason, /size conflict/)
  } finally { await rm(root, { recursive: true, force: true }) }
})
test("check reports missing mappings without downloading", async () => {
  const root = await fixture()
  try {
    let attempted = false
    const result = await migrateNotionImages({ root, check: true, getPages: async () => pageFixture(), getBlocks: async () => [{ id: "block-1", type: "image", image: { type: "external", external: { url: "https://images.example/a.png" } } }], download: async () => { attempted = true; return { body: png, contentType: "image/png" } } })
    assert.equal(result.issues.length, 2)
    assert.equal(attempted, false)
    assert.equal(result.issues[0].blockId, "cover:page-1")
    assert.equal(result.issues[1].blockId, "block-1")
  } finally { await rm(root, { recursive: true, force: true }) }
})
test("nested file images, collisions, missing-file repair and conflicts", async () => {
  const root = await fixture()
  try {
    let calls = 0
    const options = {
      root, getPages: async () => pageFixture(),
      getBlocks: async () => [{ id: "parent", type: "toggle", children: [
        { id: "first", type: "image", image: { type: "file", file: { url: "https://images.example/cover.png" } } },
        { id: "second", type: "image", image: { type: "external", external: { url: "https://images.example/cover.png" } } },
      ] }],
      download: async () => { calls++; return { body: png, contentType: "image/png" } },
    }
    assert.equal((await migrateNotionImages(options)).downloaded, 3)
    const map = JSON.parse(await readFile(resolve(root, "src/data/notion-image-map.json"), "utf8"))
    assert.equal(new Set(Object.values(map).map((v) => (v as { path: string }).path)).size, 3)
    const target = resolve(root, "public", map.first.path.slice(1))
    await rm(target)
    assert.equal((await migrateNotionImages(options)).downloaded, 1)
    assert.equal(calls, 4)
    await rm(target)
    const changed = Buffer.concat([png, Buffer.from("different")])
    const conflict = await migrateNotionImages({ ...options, download: async () => ({ body: changed, contentType: "image/png" }) })
    assert.match(conflict.issues[0].reason, /conflict/)
    await assert.rejects(readFile(target))
    const before = await readFile(resolve(root, "src/data/notion-image-map.json"), "utf8")
    assert.equal(before, JSON.stringify(map, null, 2) + "\n")
  } finally { await rm(root, { recursive: true, force: true }) }
})
test("partial successes are mapped; invalid MIME, unsafe slug and oversized bodies fail", async () => {
  const root = await fixture()
  try {
    const result = await migrateNotionImages({ root, getPages: async () => pageFixture(), getBlocks: async () => [
      { id: "bad", type: "image", image: { type: "external", external: { url: "https://images.example/bad.png" } } },
    ], download: async (url) => ({ body: url.includes("bad") ? Buffer.from("html") : png, contentType: "image/png" }) })
    assert.equal(result.downloaded, 1)
    assert.equal(result.issues[0].blockId, "bad")
    assert.equal(Object.keys(JSON.parse(await readFile(resolve(root, "src/data/notion-image-map.json"), "utf8"))).length, 1)
    assert.throws(() => validateImage(Buffer.alloc(10 * 1024 * 1024 + 1), "image/png"), /10MB/)
    const invalid = await migrateNotionImages({ root, getPages: async () => [{ post: { pageId: "p", slug: "../escape", title: "Unsafe" } }], getBlocks: async () => [] })
    assert.match(invalid.issues[0].reason, /Unsafe slug/)
  } finally { await rm(root, { recursive: true, force: true }) }
})
test("CLI imports are inert, invalid flags do not load Notion, aliases preserve JSON", async () => {
  assert.equal(isDirectRun(new URL("../../scripts/migrate-notion-images.ts", import.meta.url).href), false)
  assert.equal(await runMigrationCli(["--bogus"]), 2)
  const root = await fixture()
  try {
    await writeFile(resolve(root, "src/example.ts"), "export default 42")
    await writeFile(resolve(root, "src/example.json"), "{\"value\":42}")
    registerAliasHooks(root)
    const moduleName: string = "@/example"
    const aliasedModule = await import(moduleName)
    assert.equal(aliasedModule.default, 42)
    const jsonName: string = "@/example.json"
    const jsonModule = await import(jsonName, { with: { type: "json" } })
    assert.equal(jsonModule.default.value, 42)
    process.env.TEST_MIGRATION_SECRET = "super-secret-value"
    try { assert.equal(safeDiagnostic("https://host.example/?token=x super-secret-value"), "[URL redacted] [redacted]") }
    finally { delete process.env.TEST_MIGRATION_SECRET }
  } finally { await rm(root, { recursive: true, force: true }) }
})

test("download never makes a request to a private address", async () => {
  await assert.rejects(downloadImage("https://127.0.0.1/image.png"), /not public/)
})

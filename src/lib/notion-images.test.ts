import assert from "node:assert/strict"
import test from "node:test"

import {
  NotionImageConfigError,
  NotionImageUploadError,
  notionImageKey,
  setNotionImageUploaderForTests,
  syncNotionImage,
} from "./notion-images.ts"

const input = { body: new ArrayBuffer(3), contentType: "image/png", blockId: "00000000-0000-4000-8000-000000000001" }

function configure() {
  process.env.COS_SECRET_ID = "secret-id"
  process.env.COS_SECRET_KEY = "secret-key"
  process.env.COS_BUCKET = "bucket"
  process.env.COS_REGION = "region"
  process.env.COS_PUBLIC_BASE_URL = "https://cdn.example"
}

test.afterEach(() => {
  setNotionImageUploaderForTests(undefined)
  for (const key of ["COS_SECRET_ID", "COS_SECRET_KEY", "COS_BUCKET", "COS_REGION", "COS_PUBLIC_BASE_URL"]) delete process.env[key]
})

test("uses stable keys and MIME extensions", () => {
  assert.equal(notionImageKey(input.blockId, "IMAGE/JPEG"), `notion-images/${input.blockId}.jpg`)
  assert.equal(notionImageKey(input.blockId, "image/avif"), `notion-images/${input.blockId}.avif`)
  assert.throws(() => notionImageKey(input.blockId, "image/svg+xml"), NotionImageUploadError)
})

test("uploads with configured storage and returns the stable URL", async () => {
  configure()
  const calls: unknown[] = []
  setNotionImageUploaderForTests(async (value) => { calls.push(value); return undefined })
  assert.equal(await syncNotionImage(input), `https://cdn.example/notion-images/${input.blockId}.png`)
  assert.equal(calls.length, 1)
})

test("rejects incomplete storage configuration", async () => {
  await assert.rejects(syncNotionImage(input), NotionImageConfigError)
})

test("deduplicates concurrent uploads in one process", async () => {
  configure()
  let resolveUpload!: () => void
  const upload = new Promise<void>((resolve) => { resolveUpload = resolve })
  let calls = 0
  setNotionImageUploaderForTests(async () => { calls += 1; await upload })
  const first = syncNotionImage(input)
  const second = syncNotionImage(input)
  resolveUpload()
  assert.deepEqual(await Promise.all([first, second]), [
    `https://cdn.example/notion-images/${input.blockId}.png`,
    `https://cdn.example/notion-images/${input.blockId}.png`,
  ])
  assert.equal(calls, 1)
})

test("normalizes unexpected upload failures", async () => {
  configure()
  setNotionImageUploaderForTests(async () => { throw new Error("private SDK detail") })
  await assert.rejects(syncNotionImage(input), NotionImageUploadError)
})

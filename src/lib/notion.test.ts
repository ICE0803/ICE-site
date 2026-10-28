import assert from "node:assert/strict"
import test from "node:test"
import * as nodeModule from "node:module"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

type ResolveHook = (specifier: string, context: unknown, nextResolve: (specifier: string, context: unknown) => unknown) => unknown
const { registerHooks } = nodeModule as typeof nodeModule & { registerHooks: (hooks: { resolve: ResolveHook }) => void }

registerHooks({
  resolve(specifier: string, context: unknown, nextResolve: (specifier: string, context: unknown) => unknown) {
    if (specifier.startsWith("@/")) {
      const target = specifier === "@/types"
        ? resolve("src/types/index.ts")
        : resolve("src", `${specifier.slice(2)}.ts`)
      return nextResolve(pathToFileURL(target).href, context)
    }
    return nextResolve(specifier, context)
  },
})

process.env.NOTION_TOKEN = "test-token"
process.env.NOTION_DATABASE_ID = "00000000-0000-4000-8000-000000000000"

const { indexNotionPages, parsePage, findPublishedNotionEntry, publishedNotionPosts, getNotionPost } = await import("./notion.ts")
const { getAllPosts: localPosts } = await import("./posts.ts")
const { getPublishedPosts, getPostBySlug } = await import("./content.ts")

type Page = Parameters<typeof indexNotionPages>[number][number]

function page(slug: string, status = "已发布", overrides: Record<string, unknown> = {}, id = "00000000-0000-4000-8000-000000000001"): Page {
  return {
    id,
    properties: {
      "名称": { type: "title", title: [{ plain_text: "测试文章" }] },
      Slug: { type: "rich_text", rich_text: [{ plain_text: slug }] },
      "摘要": { type: "rich_text", rich_text: [{ plain_text: "摘要内容" }] },
      "分类": { type: "select", select: { name: "前端开发" } },
      "类型": { type: "select", select: { name: "博客" } },
      "状态": { type: "status", status: { name: status } },
      "发布时间": { type: "date", date: { start: "2026-10-23" } },
      ...overrides,
    },
  }
}

let mockPages: Page[] = []
let mockBlocks: Record<string, unknown>[] = []
let blockFailures = new Set<string>()
const fetchCalls: { url: string; init?: RequestInit }[] = []

globalThis.fetch = async (input, init) => {
  const url = String(input)
  fetchCalls.push({ url, init })
  if (url.includes("/databases/") && url.endsWith("/query")) {
    return Response.json({ results: mockPages, has_more: false })
  }
  if (url.includes("/blocks/") && url.includes("/children")) {
    const blockId = url.split("/blocks/")[1].split("/")[0]
    if (blockFailures.has(blockId)) return new Response(null, { status: 503 })
    return Response.json({ results: new Set(mockPages.map((page) => page.id)).has(blockId) ? mockBlocks : [], has_more: false })
  }
  throw new Error("Unexpected mocked Notion request")
}

test("maps Notion's completed status to a published post", () => {
  const parsed = parsePage(page("completed-post", "完成"))
  assert.equal(parsed.published, true)
})

test("accepts a draft with empty optional properties without parsing it as an error", () => {
  const draft = page("draft-without-fields", "未开始", {
    "名称": { type: "title", title: [] },
    Slug: { type: "rich_text", rich_text: [{ plain_text: "draft-without-fields" }] },
    "摘要": { type: "rich_text", rich_text: [] },
    "分类": { type: "select", select: null },
    "类型": { type: "select", select: null },
    "发布时间": { type: "date", date: null },
  })
  const entries = indexNotionPages([draft])
  assert.deepEqual(publishedNotionPosts(entries), [])
  assert.equal(entries[0]?.post, undefined)
})

test("maps Chinese properties and actual Notion value types", () => {
  const entries = indexNotionPages([
    page("notion-test"),
    page("my-note", "已发布", { "类型": { type: "select", select: { name: "笔记" } } }, "00000000-0000-4000-8000-000000000002"),
  ])
  assert.deepEqual(publishedNotionPosts(entries).map(({ slug, contentType }) => [slug, contentType]), [
    ["notion-test", "blog"], ["my-note", "note"],
  ])
  assert.equal(entries[0].post?.title, "测试文章")
  assert.equal(entries[0].post?.description, "摘要内容")
  assert.equal(entries[0].post?.category, "前端开发")
  assert.equal(entries[0].post?.date, "2026-10-23")
})

test("draft and unstarted pages are excluded from lists and details", async () => {
  for (const status of ["草稿", "未开始"]) {
    mockPages = [page("draft-article", status)]
    const entries = indexNotionPages(mockPages)
    assert.deepEqual(publishedNotionPosts(entries), [])
    assert.equal(findPublishedNotionEntry(entries, "draft-article"), undefined)
    assert.deepEqual(await getPublishedPosts(), [])
    assert.equal(await getPostBySlug("draft-article"), undefined)
  }
})

test("published pages appear in lists and are available by a new slug", async () => {
  mockPages = [page("newly-published-slug")]
  mockBlocks = [
    { id: "00000000-0000-4000-8000-000000000010", type: "heading_2", heading_2: { rich_text: [{ plain_text: "正文标题" }] } },
    { id: "00000000-0000-4000-8000-000000000011", type: "paragraph", paragraph: { rich_text: [{ plain_text: "正文段落" }] } },
  ]
  const entries = indexNotionPages(mockPages)
  assert.deepEqual(publishedNotionPosts(entries).map(({ slug }) => slug), ["newly-published-slug"])
  assert.deepEqual((await getPublishedPosts()).map(({ slug }) => slug), ["newly-published-slug"])
  fetchCalls.length = 0
  const detail = await getPostBySlug("newly-published-slug")
  assert.equal(detail?.post.slug, "newly-published-slug")
  assert.equal(detail?.content, "## 正文标题\n\n正文段落")
  assert.equal(fetchCalls.some(({ url, init }) => url.includes("/blocks/") && url.includes("/children") && init?.next?.revalidate === 300 && init.next.tags?.includes("posts")), true)
})

test("published posts with no blocks have valid empty content", async () => {
  mockPages = [page("empty-content")]
  mockBlocks = []
  blockFailures.clear()
  const result = await getNotionPost("empty-content")
  assert.equal(result?.content, "")
})

test("block content failures propagate instead of becoming empty posts", async () => {
  mockPages = [page("unavailable-content", "已发布", {}, "00000000-0000-4000-8000-000000000003")]
  blockFailures = new Set(["00000000-0000-4000-8000-000000000003"])
  await assert.rejects(getNotionPost("unavailable-content"), /Notion API returned 503/)

  mockPages = [page("nested-unavailable-content", "已发布", {}, "00000000-0000-4000-8000-000000000004")]
  mockBlocks = [{ id: "00000000-0000-4000-8000-000000000012", type: "paragraph", has_children: true }]
  blockFailures = new Set(["00000000-0000-4000-8000-000000000012"])
  await assert.rejects(getNotionPost("nested-unavailable-content"), /Notion API returned 503/)
  blockFailures.clear()
})

test("missing fields and invalid slugs are isolated", () => {
  const entries = indexNotionPages([
    page("empty-summary", "已发布", { "摘要": { type: "rich_text", rich_text: [] } }),
    page("no-category", "已发布", { "分类": { type: "select", select: null } }, "00000000-0000-4000-8000-000000000002"),
    page("no-date", "已发布", { "发布时间": { type: "date", date: null } }, "00000000-0000-4000-8000-000000000003"),
    page("no-title", "已发布", { "名称": { type: "title", title: [] } }, "00000000-0000-4000-8000-000000000004"),
    page("INVALID SLUG", "已发布", {}, "00000000-0000-4000-8000-000000000005"),
    page("good-post", "已发布", {}, "00000000-0000-4000-8000-000000000006"),
  ])
  assert.deepEqual(publishedNotionPosts(entries).map(({ slug }) => slug), ["good-post"])
  assert.equal(entries.some((entry) => entry.slug === "INVALID SLUG"), false)
})

test("unpublishing removes list and detail access without exposing local MDX", async () => {
  const localSlug = localPosts()[0].slug
  mockPages = [page(localSlug)]
  assert.equal((await getPostBySlug(localSlug))?.post.published, true)

  mockPages = [page(localSlug, "草稿")]
  assert.deepEqual(await getPublishedPosts(), [])
  assert.equal(await getPostBySlug(localSlug), undefined)
})

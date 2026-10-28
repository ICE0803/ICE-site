import { cache } from "react"
import { z } from "zod"

import type { Post } from "@/types"
import { readingTime } from "@/lib/utils"
import { notionBlocksToMarkdown } from "@/lib/notion-blocks"

const notionApi = "https://api.notion.com/v1"
const apiVersion = process.env.NOTION_API_VERSION ?? "2022-06-28"

const contentSchema = z.object({
  pageId: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  category: z.string().min(1),
  contentType: z.enum(["blog", "note"]),
  published: z.boolean(),
  tags: z.array(z.string()).optional(),
  cover: z.string().url().refine((url) => /^https?:\/\//.test(url)).optional(),
})

type NotionResult = { results: Record<string, unknown>[]; next_cursor?: string | null; has_more?: boolean }
type NotionPage = Record<string, unknown> & { id: string; properties: Record<string, unknown>; cover?: Record<string, unknown> | null }
type NotionBlock = Record<string, unknown> & { id: string; type: string; has_children?: boolean }
type ContentPost = Post & { pageId: string; tags?: string[]; cover?: string }
type PostContent = { post: Omit<ContentPost, "pageId">; content: string }
type IndexEntry = { pageId: string; slug: string; post?: ContentPost }
type NotionStage = "database-query" | "block-children" | "image-block" | "unknown"

class NotionRequestError extends Error {
  constructor(
    readonly stage: NotionStage,
    readonly status: number | undefined,
    readonly failureType: string,
    readonly reason: string,
    options?: ErrorOptions,
  ) {
    super(reason, options)
    this.name = failureType
  }
}

function notionStage(path: string): NotionStage {
  if (path.includes("/databases/") && path.endsWith("/query")) return "database-query"
  if (path.includes("/children")) return "block-children"
  if (path.startsWith("/blocks/")) return "image-block"
  return "unknown"
}

function safeErrorMessage(message: string): string {
  return message
    .replace(/https?:\/\/[^\s"'<>]+/gi, "[URL redacted]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/((?:token|secret|authorization)\s*[:=]\s*)\S+/gi, "$1[redacted]")
    .slice(0, 200)
}

export function notionErrorDetails(error: unknown) {
  if (error instanceof NotionRequestError) {
    return { stage: error.stage, status: error.status, type: error.failureType, reason: error.reason }
  }
  return {
    stage: "unknown" as const,
    status: undefined,
    type: error instanceof Error ? error.name : typeof error,
    reason: error instanceof Error ? safeErrorMessage(error.message) : "unknown error",
  }
}

const notionEnabled = Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)

const fields = {
  title: "名称",
  slug: "Slug",
  description: "摘要",
  category: "分类",
  contentType: "类型",
  status: "状态",
  date: "发布时间",
  updatedAt: "Updated At",
  tags: "Tags",
} as const

function property(page: NotionPage, name: string): Record<string, unknown> | undefined {
  return page.properties?.[name] as Record<string, unknown> | undefined
}

function richTextValue(value: unknown): string {
  if (!Array.isArray(value)) return ""
  return value.map((part) => (part as { plain_text?: string }).plain_text ?? "").join("").trim()
}

function selectValue(value: unknown): string {
  if (!value || typeof value !== "object") return ""
  return ((value as { name?: string }).name ?? "").trim()
}

function propertyText(page: NotionPage, name: string): string {
  const item = property(page, name)
  if (!item) return ""
  if (item.type === "title") return richTextValue(item.title)
  if (item.type === "rich_text") return richTextValue(item.rich_text)
  if (item.type === "select") return selectValue(item.select)
  if (item.type === "status") return selectValue(item.status)
  return ""
}

function propertyDate(page: NotionPage, name: string): string | undefined {
  const item = property(page, name)
  if (item?.type !== "date") return undefined
  const value = item.date as { start?: string } | null | undefined
  return value?.start?.slice(0, 10)
}

function pageCover(page: NotionPage): string | undefined {
  const cover = page.cover as { type?: string; external?: { url?: string } } | null | undefined
  return cover?.type === "external" && /^https?:\/\//.test(cover.external?.url ?? "")
    ? cover.external?.url
    : undefined
}

function contentStatus(value: string): { published: boolean; valid: boolean } {
  if (["published", "已发布", "完成"].includes(value)) return { published: true, valid: true }
  if (["draft", "草稿", "未开始", "archived", "已归档"].includes(value)) return { published: false, valid: true }
  return { published: false, valid: false }
}

export function parsePage(page: NotionPage): ContentPost {
  const statusValue = propertyText(page, fields.status).toLowerCase()
  const status = contentStatus(statusValue)
  if (!status.valid) throw new Error(`Invalid property "${fields.status}": unsupported status value`)
  const rawType = propertyText(page, fields.contentType).toLowerCase()
  const contentType = rawType === "博客" ? "blog" : rawType === "笔记" ? "note" : rawType
  const rawTags = property(page, fields.tags)?.multi_select as { name?: string }[] | undefined
  return contentSchema.parse({
    pageId: page.id,
    slug: propertyText(page, fields.slug),
    title: propertyText(page, fields.title),
    description: propertyText(page, fields.description),
    date: propertyDate(page, fields.date),
    updatedAt: propertyDate(page, fields.updatedAt),
    category: propertyText(page, fields.category),
    contentType,
    published: status.published,
    tags: rawTags?.map((tag) => tag.name ?? "").filter(Boolean),
    cover: pageCover(page),
  })
}

async function notionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.NOTION_TOKEN
  if (!token) throw new Error("Notion integration is not configured")

  let lastError: unknown
  for (let attempt = 0; attempt < 3; attempt += 1) {
    let status: number | undefined
    try {
      const response = await fetch(`${notionApi}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": apiVersion,
          "Content-Type": "application/json",
          ...init?.headers,
        },
        signal: AbortSignal.timeout(10_000),
        ...(init?.cache === "no-store" ? {} : { next: { revalidate: 300, tags: ["posts"] } }),
      })
      status = response.status
      if (response.ok) {
        try {
          return (await response.json()) as T
        } catch (error) {
          throw new NotionRequestError(notionStage(path), status, "NotionResponseError", "Invalid JSON response", { cause: error })
        }
      }
      const failureType = response.status === 429 || response.status >= 500 ? "NotionServiceError" : "NotionRequestError"
      const failure = new NotionRequestError(
        notionStage(path), status, failureType,
        response.status === 429 ? "Rate limited" : `Notion API returned ${response.status}`,
      )
      if (response.status !== 429 && response.status < 500) throw failure
      lastError = failure
    } catch (error) {
      if (error instanceof NotionRequestError && error.failureType === "NotionRequestError" && error.status !== 429 && (error.status ?? 0) < 500) throw error
      lastError = error instanceof NotionRequestError
        ? error
        : new NotionRequestError(notionStage(path), status, error instanceof Error ? error.name : "UnknownError", error instanceof Error ? safeErrorMessage(error.message) : "unknown error", { cause: error })
    }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt))
  }
  if (lastError instanceof NotionRequestError) throw lastError
  throw new NotionRequestError(notionStage(path), undefined, "NotionRequestError", "Notion API request failed", { cause: lastError })
}

async function paginated<T extends Record<string, unknown>>(
  path: string,
  method: "GET" | "POST",
): Promise<T[]> {
  const result: T[] = []
  let cursor: string | undefined
  do {
    const options = { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }
    const response = method === "POST"
      ? await notionFetch<NotionResult>(path, { method, body: JSON.stringify(options) })
      : await notionFetch<NotionResult>(`${path}?${new URLSearchParams(
          Object.entries(options).map(([key, value]) => [key, String(value)]),
        )}`)
    result.push(...(response.results as T[]))
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined
  } while (cursor)
  return result
}

export function indexNotionPages(pages: NotionPage[]): IndexEntry[] {
  const entries: IndexEntry[] = pages.flatMap((page): IndexEntry[] => {
    const slug = propertyText(page, fields.slug)
    const status = contentStatus(propertyText(page, fields.status).toLowerCase())
    if (status.valid && !status.published) {
      return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? [{ pageId: page.id, slug }] : []
    }
    try {
      return [{ pageId: page.id, slug, post: parsePage(page) }]
    } catch (error) {
      const reason = error instanceof z.ZodError
        ? error.issues.map((issue) => `${issue.path.join(".")}: ${issue.code}`).join(", ")
        : error instanceof Error ? error.message : "unknown error"
      console.error("Notion page parse failed", { pageId: page.id, stage: "properties", reason })
      return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? [{ pageId: page.id, slug }] : []
    }
  })
  return entries.sort((a, b) =>
    (b.post?.date ?? "").localeCompare(a.post?.date ?? ""),
  )
}

const getNotionIndex = cache(async (): Promise<IndexEntry[]> => {
  const pages = await paginated<NotionPage>(`/databases/${process.env.NOTION_DATABASE_ID}/query`, "POST")
  return indexNotionPages(pages)
})

async function getBlockChildren(blockId: string): Promise<NotionBlock[]> {
  return paginated<NotionBlock>(`/blocks/${blockId}/children`, "GET")
}

async function expandBlocks(blocks: NotionBlock[], depth = 0): Promise<NotionBlock[]> {
  if (depth > 12) throw new Error("Notion block nesting limit exceeded")
  return Promise.all(blocks.map(async (block) => {
    if (!block.has_children) return block
    const children = await getBlockChildren(block.id)
    return { ...block, children: await expandBlocks(children, depth + 1) }
  }))
}

export function isNotionConfigured(): boolean {
  return notionEnabled
}

export function publishedNotionPosts(entries: IndexEntry[]): Post[] {
  return entries.flatMap((entry) => {
    if (!entry.post?.published) return []
    const { pageId, ...post } = entry.post
    void pageId
    return [post]
  })
}

export async function getNotionPosts(): Promise<Post[]> {
  return publishedNotionPosts(await getNotionIndex())
}

export async function hasNotionPost(slug: string): Promise<boolean> {
  return (await getNotionIndex()).some((entry) => entry.slug === slug)
}

export function findPublishedNotionEntry(entries: IndexEntry[], slug: string): ContentPost | undefined {
  const matches = entries.filter((entry) => entry.slug === slug)
  if (matches.length !== 1) return undefined
  return matches[0].post?.published ? matches[0].post : undefined
}

export async function getNotionImageBlock(blockId: string): Promise<NotionBlock | undefined> {
  if (!notionEnabled) return undefined
  try {
    return await notionFetch<NotionBlock>(`/blocks/${blockId}`, { cache: "no-store" })
  } catch (error) {
    if (error instanceof Error && error.message === "Notion API returned 404") return undefined
    throw error
  }
}

export async function downloadNotionImage(url: string): Promise<Response> {
  return fetch(url, { redirect: "error", signal: AbortSignal.timeout(10_000), cache: "no-store" })
}

export async function getNotionPost(slug: string): Promise<PostContent | undefined> {
  const post = findPublishedNotionEntry(await getNotionIndex(), slug)
  if (!post) return undefined
  const blocks = await getBlockChildren(post.pageId)
  const expandedBlocks = await expandBlocks(blocks)
  const content = notionBlocksToMarkdown(expandedBlocks)
  const { pageId, ...publicPost } = post
  void pageId
  return { post: { ...publicPost, readingTime: readingTime(content) }, content }
}

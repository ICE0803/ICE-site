import { cache } from "react"

import type { Post } from "@/types"
import * as localPosts from "@/lib/posts"
import { getNotionPost, getNotionPosts, hasNotionPost, isNotionConfigured, notionErrorDetails } from "@/lib/notion"

function readLocalPosts<T>(operation: "list" | "detail", read: () => T): T {
  try {
    return read()
  } catch (error) {
    console.error("Local posts read failed", {
      ...notionErrorDetails(error),
      stage: "local-read",
      operation,
      stack: error instanceof Error ? error.stack?.split("\n").filter((line) => /^\s+at /.test(line)).slice(0, 8).join("\n") : undefined,
    })
    throw error
  }
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  if (!isNotionConfigured()) return readLocalPosts("list", () => localPosts.getAllPosts())
  try {
    return await getNotionPosts()
  } catch (error) {
    console.error("Notion content index unavailable; using local posts", notionErrorDetails(error))
    return readLocalPosts("list", () => localPosts.getAllPosts())
  }
})

export const getPublishedPosts = cache(async (): Promise<Post[]> =>
  (await getAllPosts()).filter((post) => post.published),
)

export async function getLatestPosts(count = 3): Promise<Post[]> {
  return (await getPublishedPosts()).slice(0, count)
}

export const getPostBySlug = cache(async (slug: string) => {
  if (isNotionConfigured()) {
    let exists: boolean
    try {
      exists = await hasNotionPost(slug)
    } catch (error) {
      console.error("Notion content index unavailable; using local post", notionErrorDetails(error))
      const local = readLocalPosts("detail", () => localPosts.getPostBySlug(slug))
      return local?.post.published ? local : undefined
    }
    if (exists) return getNotionPost(slug)
  }
  const local = readLocalPosts("detail", () => localPosts.getPostBySlug(slug))
  return local?.post.published ? local : undefined
})

export async function getAllCategories(): Promise<string[]> {
  return [...new Set((await getPublishedPosts()).map((post) => post.category))]
}

export async function getAdjacentPosts(slug: string): Promise<{ previous?: Post; next?: Post }> {
  const published = await getPublishedPosts()
  const index = published.findIndex((post) => post.slug === slug)
  if (index === -1) return {}
  return { previous: published[index - 1], next: published[index + 1] }
}

export async function getRelatedPosts(slug: string, count = 3): Promise<Post[]> {
  const published = await getPublishedPosts()
  const current = published.find((post) => post.slug === slug)
  if (!current) return []
  return published.filter((post) => post.slug !== slug && post.category === current.category).slice(0, count)
}

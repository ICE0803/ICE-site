import fs from "node:fs"
import path from "node:path"
import { cache } from "react"

import matter from "gray-matter"
import { z } from "zod"

import type { Post } from "@/types"
import { readingTime } from "@/lib/utils"

const postsDirectory = path.join(process.cwd(), "content", "posts")

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const postSchema = z.object({
  title: z.string({ error: "title 为必填字段" }).min(1, "title 不能为空"),
  description: z
    .string({ error: "description 为必填字段" })
    .min(1, "description 不能为空"),
  date: z
    .string({ error: "date 为必填字段" })
    .regex(dateRegex, "date 必须是 YYYY-MM-DD 格式"),
  updatedAt: z
    .string()
    .regex(dateRegex, "updatedAt 必须是 YYYY-MM-DD 格式")
    .optional(),
  category: z
    .string({ error: "category 为必填字段" })
    .min(1, "category 不能为空"),
  contentType: z.enum(["blog", "note"]).default("blog"),
  published: z.boolean().default(false),
  featured: z.boolean().optional(),
})

type PostFile = { post: Post; content: string }

function parsePostFile(file: string): PostFile {
  const fullPath = path.join(postsDirectory, file)
  const raw = fs.readFileSync(fullPath, "utf-8")
  const { data, content } = matter(raw)

  const result = postSchema.safeParse(data)
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n")
    throw new Error(`文章 ${file} 的 frontmatter 校验失败：\n${issues}`)
  }

  const parsed = result.data
  return {
    post: {
      slug: file.replace(/\.mdx$/, ""),
      title: parsed.title,
      description: parsed.description,
      date: parsed.date,
      updatedAt: parsed.updatedAt,
      category: parsed.category,
      contentType: parsed.contentType,
      published: parsed.published,
      featured: parsed.featured,
      readingTime: readingTime(content),
    },
    content,
  }
}

const readAllPosts = cache((): PostFile[] => {
  if (!fs.existsSync(postsDirectory)) return []

  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))

  return files
    .map(parsePostFile)
    .sort((a, b) => Date.parse(b.post.date) - Date.parse(a.post.date))
})

export function getAllPosts(): Post[] {
  return readAllPosts().map(({ post }) => post)
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => post.published)
}

export function getLatestPosts(count = 3): Post[] {
  return getPublishedPosts().slice(0, count)
}

export function getPostBySlug(slug: string): PostFile | undefined {
  return readAllPosts().find(({ post }) => post.slug === slug)
}

export function getAllCategories(): string[] {
  return [...new Set(getPublishedPosts().map((post) => post.category))]
}

export function getAdjacentPosts(slug: string): {
  previous?: Post
  next?: Post
} {
  const published = getPublishedPosts()
  const index = published.findIndex((post) => post.slug === slug)
  if (index === -1) return {}

  return {
    previous: published[index - 1],
    next: published[index + 1],
  }
}

export function getRelatedPosts(slug: string, count = 3): Post[] {
  const published = getPublishedPosts()
  const current = published.find((post) => post.slug === slug)
  if (!current) return []

  return published
    .filter((post) => post.slug !== slug && post.category === current.category)
    .slice(0, count)
}

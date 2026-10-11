import type { Metadata } from "next"

import {
  getAllCategories,
  getAllTags,
  getPublishedPosts,
} from "@/lib/posts"
import { PostList } from "@/components/blog/post-list"

export const metadata: Metadata = {
  title: "博客",
  description: "技术文章合集，涵盖 AI、大模型、Agent、强化学习与后端开发。",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  const posts = getPublishedPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">博客</h1>
      <p className="mt-2 text-muted-foreground">
        记录技术实践与思考，按分类和标签浏览。
      </p>
      <div className="mt-8">
        <PostList posts={posts} categories={categories} tags={tags} />
      </div>
    </div>
  )
}

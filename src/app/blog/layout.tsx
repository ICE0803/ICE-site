import type { ReactNode } from "react"

import { getPublishedPosts } from "@/lib/content"
import { BlogLayout } from "@/components/blog/blog-layout"

export default async function Layout({ children }: { children: ReactNode }) {
  const posts = await getPublishedPosts()

  return <BlogLayout posts={posts}>{children}</BlogLayout>
}

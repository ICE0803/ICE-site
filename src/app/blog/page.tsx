import { redirect } from "next/navigation"

import { getPublishedPosts } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const latest = posts[0]

  if (latest) redirect(`/blog/${latest.slug}`)

  return (
    <div className="rounded-xl border border-border p-10 text-center">
      <p className="text-muted-foreground">暂无已发布文章</p>
    </div>
  )
}

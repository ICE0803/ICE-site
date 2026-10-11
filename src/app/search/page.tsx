import type { Metadata } from "next"
import { Suspense } from "react"

import { getPublishedPosts } from "@/lib/posts"
import { SearchPage } from "@/components/search/search-page"

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索站内文章。",
  robots: { index: false, follow: false },
}

export default function SearchPageRoute() {
  const posts = getPublishedPosts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">搜索</h1>
      <p className="mt-2 text-muted-foreground">
        搜索文章标题、摘要、标签或分类。
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <p className="text-sm text-muted-foreground">加载中…</p>
          }
        >
          <SearchPage posts={posts} />
        </Suspense>
      </div>
    </div>
  )
}

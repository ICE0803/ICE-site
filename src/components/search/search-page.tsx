"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

import type { Post } from "@/types"
import { PostCard } from "@/components/blog/post-card"

export function SearchPage({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  const updateQuery = (value: string) => {
    setQuery(value)
    const params = new URLSearchParams()
    if (value) params.set("q", value)
    const qs = params.toString()
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q),
    )
  }, [posts, query])

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <label htmlFor="site-search" className="sr-only">
          搜索文章
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          placeholder="搜索文章标题、摘要或分类…"
          className="glass h-10 w-full rounded-md pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {query.trim()
          ? `找到 ${filtered.length} 篇相关文章`
          : `共 ${posts.length} 篇文章`}
      </p>

      {filtered.length === 0 ? (
        <div className="glass mt-6 rounded-lg p-10 text-center">
          <p className="text-muted-foreground">未找到相关文章</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

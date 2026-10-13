"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import type { Post } from "@/types"
import { cn } from "@/lib/utils"
import { PostCard } from "./post-card"

const PAGE_SIZE = 9

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-3 py-1 text-sm transition-colors",
        active
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function PageButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm transition-colors",
        active
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-border text-muted-foreground hover:text-foreground",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      {children}
    </button>
  )
}

export function PostList({
  posts,
  categories,
}: {
  posts: Post[]
  categories: string[]
}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q)
      const matchesCategory = !category || post.category === category
      return matchesQuery && matchesCategory
    })
  }, [posts, query, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const reset = () => {
    setQuery("")
    setCategory("")
    setPage(1)
  }

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <label htmlFor="post-search" className="sr-only">
          搜索文章
        </label>
        <input
          id="post-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
          placeholder="搜索文章标题或摘要…"
          className="glass h-10 w-full rounded-md pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip
          active={category === ""}
          onClick={() => {
            setCategory("")
            setPage(1)
          }}
        >
          全部
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c}
            active={category === c}
            onClick={() => {
              setCategory(c)
              setPage(1)
            }}
          >
            {c}
          </FilterChip>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        共 {filtered.length} 篇文章
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border p-10 text-center">
          <p className="text-muted-foreground">未找到相关文章</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm text-accent hover:underline"
          >
            清除筛选
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((post, i) => (
            <div
              key={post.slug}
              data-reveal
              style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          className="mt-8 flex items-center justify-center gap-2"
          aria-label="分页"
        >
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            上一页
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PageButton
              key={n}
              active={n === currentPage}
              onClick={() => setPage(n)}
            >
              {n}
            </PageButton>
          ))}
          <PageButton
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            下一页
          </PageButton>
        </nav>
      )}
    </div>
  )
}

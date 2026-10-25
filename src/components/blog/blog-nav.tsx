"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronRight,
  FileText,
  Menu,
  NotebookPen,
  PanelLeftClose,
  Search,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { ContentType, Post } from "@/types"
import { contentTypes } from "@/data/content-types"
import { cn } from "@/lib/utils"

const TYPE_ICON: Record<ContentType, LucideIcon> = {
  blog: FileText,
  note: NotebookPen,
}

export function BlogNav({
  posts,
  onHide,
  desktopVisible,
}: {
  posts: Post[]
  onHide: () => void
  desktopVisible: boolean
}) {
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [collapsed, setCollapsed] = useState<Record<ContentType, boolean>>({
    blog: false,
    note: true,
  })
  const [open, setOpen] = useState(false)

  const counts = useMemo(() => {
    const result: Record<ContentType, number> = { blog: 0, note: 0 }
    for (const post of posts) result[post.contentType] += 1
    return result
  }, [posts])

  const q = query.trim().toLowerCase()
  const filtering = q !== ""

  const groups = useMemo(() => {
    return contentTypes.map((item) => {
      const list = posts.filter((post) => {
        if (post.contentType !== item.value) return false
        if (
          q &&
          !post.title.toLowerCase().includes(q) &&
          !post.description.toLowerCase().includes(q)
        )
          return false
        return true
      })
      return { ...item, list }
    })
  }, [posts, q])

  const isExpanded = (value: ContentType) => {
    if (filtering) {
      const group = groups.find((g) => g.value === value)
      return !!group && group.list.length > 0
    }
    return !collapsed[value]
  }

  const toggle = (value: ContentType) =>
    setCollapsed((prev) => ({ ...prev, [value]: !prev[value] }))

  const navBody = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2.5">
        <span className="text-base font-semibold tracking-tight text-foreground">博客</span>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onHide()
          }}
          aria-label="隐藏博客侧栏"
          title="隐藏博客侧栏"
          className="hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground md:inline-flex"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索标题或摘要…"
          aria-label="搜索文章"
          className="glass h-10 w-full rounded-md pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <nav aria-label="文章导航" className="flex flex-col gap-1">
        {groups.map((group) => {
          const Icon = TYPE_ICON[group.value]
          const expanded = isExpanded(group.value)
          return (
            <div key={group.value}>
              <button
                type="button"
                onClick={() => toggle(group.value)}
                aria-expanded={expanded}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                    expanded && "rotate-90",
                  )}
                />
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{group.label}</span>
                <span className="ml-auto tabular-nums text-xs text-muted-foreground">
                  {counts[group.value]}
                </span>
              </button>

              {expanded && (
                <ul className="mt-1 flex flex-col">
                  {group.list.length === 0 ? (
                    <li className="px-2.5 py-2 text-sm text-muted-foreground">
                      {filtering ? "无匹配结果" : `暂无${group.label}`}
                    </li>
                  ) : (
                    group.list.map((post) => {
                      const href = `/blog/${post.slug}`
                      const active = pathname === href
                      return (
                        <li key={post.slug}>
                          <Link
                            href={href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "block rounded-md px-2.5 py-1.5 text-sm leading-snug break-words transition-colors",
                              active
                                ? "bg-accent/10 font-medium text-accent"
                                : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                            )}
                          >
                            {post.title}
                          </Link>
                        </li>
                      )
                    })
                  )}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass glass-hover fixed left-4 top-24 z-40 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground md:hidden"
      >
        <Menu className="h-4 w-4" />
        目录
      </button>

      <aside
        className={cn(
          "blog-nav-scroll glass fixed inset-y-0 left-0 z-40 hidden h-screen w-[18rem] min-w-0 overflow-y-auto overflow-x-hidden overscroll-contain px-3 pb-6 pt-3 backdrop-blur-xl backdrop-saturate-150 md:block lg:w-[20rem]",
          !desktopVisible && "md:invisible md:pointer-events-none",
        )}
        inert={!desktopVisible}
      >
        {navBody}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-background p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">文章目录</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭目录"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {navBody}
          </aside>
        </div>
      )}
    </>
  )
}

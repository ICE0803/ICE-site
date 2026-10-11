import type { Metadata } from "next"
import Link from "next/link"

import { getPublishedPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import type { Post } from "@/types"

export const metadata: Metadata = {
  title: "归档",
  description: "按年份归档的所有文章。",
  alternates: { canonical: "/archive" },
}

export default function ArchivePage() {
  const posts = getPublishedPosts()

  const grouped = new Map<string, Post[]>()
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    const list = grouped.get(year) ?? []
    list.push(post)
    grouped.set(year, list)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">归档</h1>
      <p className="mt-3 text-muted-foreground">
        共 {posts.length} 篇文章，按年份归档。
      </p>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          暂无已发布的文章。
        </p>
      ) : (
        <div className="mt-10 space-y-10">
          {[...grouped.entries()].map(([year, yearPosts]) => (
            <section key={year}>
              <h2 className="text-xl font-semibold tracking-tight">{year}</h2>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {yearPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <span className="font-medium transition-colors group-hover:text-accent">
                        {post.title}
                      </span>
                      <time
                        dateTime={post.date}
                        className="shrink-0 text-sm text-muted-foreground"
                      >
                        {formatDate(post.date)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

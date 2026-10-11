import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getLatestPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export function LatestPosts() {
  const posts = getLatestPosts(3)

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">最新文章</h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          文章即将发布，敬请期待。
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="font-medium transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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
      )}
    </section>
  )
}

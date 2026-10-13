import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getLatestPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export function LatestPosts() {
  const posts = getLatestPosts(3)

  return (
    <section className="container-page py-16 sm:py-20">
      <div data-reveal className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          最新文章
        </h2>
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-1 pb-1 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {posts.length === 0 ? (
        <p data-reveal className="text-sm text-muted-foreground">
          文章即将发布，敬请期待。
        </p>
      ) : (
        <ul className="border-t border-border">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className="border-b border-border"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group -mx-3 flex flex-col gap-2 rounded-lg px-3 py-5 transition-colors hover:bg-muted/60 sm:flex-row sm:items-baseline sm:gap-6 lg:py-6"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium transition-colors group-hover:text-accent sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </div>
                <time
                  dateTime={post.date}
                  className="shrink-0 text-sm tabular-nums text-muted-foreground"
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

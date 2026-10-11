import Link from "next/link"

import type { Post } from "@/types"
import { formatDate } from "@/lib/utils"

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-lg border border-border bg-muted p-5 transition-colors hover:border-accent/50">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime} 分钟</span>
        </div>
        <h3 className="mt-2 font-semibold transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}

import Link from "next/link"

import type { Post } from "@/types"
import { formatDate } from "@/lib/utils"

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="glass glass-hover h-full rounded-xl p-6 backdrop-blur-xl backdrop-saturate-150">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime} 分钟</span>
        </div>
        <h3 className="mt-2.5 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      </Link>
    </article>
  )
}

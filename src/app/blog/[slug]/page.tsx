import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { evaluate } from "next-mdx-remote-client/rsc"
import type { EvaluateOptions } from "next-mdx-remote-client/rsc"

import "katex/dist/katex.min.css"

import {
  getAdjacentPosts,
  getPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
} from "@/lib/posts"
import { mdxOptions } from "@/lib/mdx"
import { mdxComponents } from "@/components/mdx/mdx-components"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { Toc } from "@/components/blog/toc"
import { PostCard } from "@/components/blog/post-card"
import { formatDate } from "@/lib/utils"
import type { TocItem } from "@/types"

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const result = getPostBySlug(slug)
  if (!result) return {}

  return {
    title: result.post.title,
    description: result.post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: result.post.title,
      description: result.post.description,
      publishedTime: new Date(result.post.date).toISOString(),
      modifiedTime: result.post.updatedAt
        ? new Date(result.post.updatedAt).toISOString()
        : undefined,
    },
  }
}

type Scope = { toc?: TocItem[] }

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = getPostBySlug(slug)

  if (!result || !result.post.published) notFound()

  const { post, content } = result

  const options: EvaluateOptions<Scope> = {
    mdxOptions,
    vfileDataIntoScope: "toc",
  }

  const evaluated = await evaluate<Record<string, unknown>, Scope>({
    source: content,
    options,
    components: mdxComponents,
  })

  if (evaluated.error) throw evaluated.error

  const toc = evaluated.scope.toc ?? []
  const { previous, next } = getAdjacentPosts(slug)
  const related = getRelatedPosts(slug)

  return (
    <>
      <ReadingProgress />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex justify-center gap-8">
          <article className="min-w-0 max-w-3xl flex-1">
            <header>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.updatedAt && (
                  <>
                    <span aria-hidden>·</span>
                    <span>更新于 {formatDate(post.updatedAt)}</span>
                  </>
                )}
                <span aria-hidden>·</span>
                <span>{post.category}</span>
                <span aria-hidden>·</span>
                <span>{post.readingTime} 分钟阅读</span>
              </div>
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
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
            </header>

            <div className="prose prose-invert mt-10 max-w-none">
              {evaluated.content}
            </div>

            <footer className="mt-12">
              <nav
                className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between"
                aria-label="文章导航"
              >
                {previous ? (
                  <Link
                    href={`/blog/${previous.slug}`}
                    className="group flex-1 rounded-lg border border-border p-4 transition-colors hover:border-accent/50 sm:max-w-[50%]"
                  >
                    <span className="text-xs text-muted-foreground">上一篇</span>
                    <span className="mt-1 block font-medium transition-colors group-hover:text-accent">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span className="hidden sm:block sm:flex-1" />
                )}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex-1 rounded-lg border border-border p-4 text-left transition-colors hover:border-accent/50 sm:max-w-[50%] sm:text-right"
                  >
                    <span className="text-xs text-muted-foreground">下一篇</span>
                    <span className="mt-1 block font-medium transition-colors group-hover:text-accent">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <span className="hidden sm:block sm:flex-1" />
                )}
              </nav>

              {related.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold tracking-tight">
                    相关文章
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((item) => (
                      <PostCard key={item.slug} post={item} />
                    ))}
                  </div>
                </section>
              )}
            </footer>
          </article>

          <aside className="sticky top-20 hidden h-fit w-60 shrink-0 xl:block">
            <Toc items={toc} />
          </aside>
        </div>
      </div>
    </>
  )
}

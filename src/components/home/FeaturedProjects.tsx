import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getFeaturedProjects } from "@/data/projects"
import { ProjectCard } from "@/components/projects/project-card"

export function FeaturedProjects() {
  const featured = getFeaturedProjects()

  if (featured.length === 0) return null

  // 只有一张卡片时不强行补占位数据，用单列让它自然占满整行。
  const columns =
    featured.length === 1
      ? ""
      : featured.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3"

  return (
    <section className="container-page py-16 sm:py-20">
      <div data-reveal className="mb-8 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          精选项目
        </h2>
        <Link
          href="/projects"
          className="inline-flex shrink-0 items-center gap-1 pb-1 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className={`grid gap-5 ${columns}`}>
        {featured.map((project, i) => (
          <div
            key={project.slug}
            data-reveal
            style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            className="flex"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getFeaturedProjects } from "@/data/projects"
import { ProjectCard } from "@/components/projects/project-card"

export function FeaturedProjects() {
  const featured = getFeaturedProjects()

  if (featured.length === 0) return null

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">精选项目</h2>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}

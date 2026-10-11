import Link from "next/link"

import type { Project } from "@/types"
import { StatusBadge } from "@/components/projects/status-badge"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-muted p-5 transition-colors hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  )
}

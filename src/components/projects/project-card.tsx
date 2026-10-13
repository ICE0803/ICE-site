import Link from "next/link"

import type { Project } from "@/types"
import { StatusBadge } from "@/components/projects/status-badge"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass glass-hover group flex h-full w-full flex-col rounded-xl p-6 backdrop-blur-xl backdrop-saturate-150 sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="glass-chip rounded-md px-2.5 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  )
}

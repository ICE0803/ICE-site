"use client"

import { useState } from "react"

import type { Project, ProjectStatus } from "@/types"
import { ProjectCard } from "@/components/projects/project-card"
import { cn } from "@/lib/utils"

type Filter = ProjectStatus | "all"

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "active", label: "已上线" },
  { value: "in-progress", label: "进行中" },
  { value: "archived", label: "已归档" },
]

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all")

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.status === filter)

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="按状态筛选">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={cn(
              "inline-flex h-8 items-center rounded-md border px-3 text-sm transition-colors",
              filter === f.value
                ? "border-accent/50 bg-muted text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          该分类下暂无项目。
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

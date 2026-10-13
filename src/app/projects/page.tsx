import type { Metadata } from "next"

import { projects } from "@/data/projects"
import { ProjectList } from "@/components/projects/project-list"

export const metadata: Metadata = {
  title: "项目",
  description: "我参与和开发的项目。",
  alternates: { canonical: "/projects" },
}

export default function ProjectsPage() {
  return (
    <div className="container-page py-14 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight">项目</h1>
      <p className="mt-3 text-muted-foreground">
        这里是我参与和开发的项目，按状态筛选查看。
      </p>

      <div className="mt-8">
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}

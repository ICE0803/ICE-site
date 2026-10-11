import type { Project } from "@/types"

// 项目数据独立管理。以下为占位示例，状态均为「进行中」，请替换为真实项目。
export const projects: Project[] = [
  {
    slug: "placeholder-project",
    name: "示例项目",
    description: "这是一个用于展示项目卡片样式的占位项目，请替换为真实项目资料。",
    techStack: ["Next.js", "TypeScript"],
    status: "in-progress",
    featured: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

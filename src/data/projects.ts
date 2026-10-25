import type { Project } from "@/types"

export const projects: Project[] = [
  {
    slug: "travel-agent",
    name: "智能旅行助手",
    description:
      "基于 AgentScope 与大语言模型构建的多智能体差旅助手，采用 Plan-and-Execute 架构完成意图识别、任务编排与结果聚合。系统支持行程规划、记忆查询、偏好管理、知识问答和信息查询，结合 Redis + PostgreSQL 两层记忆、Milvus Lite + BM25 混合 RAG 检索、联网搜索以及同优先级 Agent 并行调度，为差旅场景提供可追溯、可扩展且具备故障降级能力的智能服务。",
    techStack: [
      "Python",
      "AgentScope",
      "Redis",
      "PostgreSQL",
      "Milvus Lite",
      "RAG",
    ],
    status: "active",
    github: "https://github.com/ICE0803/travel_agent",
    featured: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

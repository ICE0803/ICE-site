import type { ContentType } from "@/types"

export type ContentTypeItem = {
  value: ContentType
  label: string
  description: string
  // 预留给未来的二级分类，当前不填充；侧边栏只在有 children 时才渲染。
  children?: { value: string; label: string }[]
}

export const contentTypes: ContentTypeItem[] = [
  {
    value: "blog",
    label: "博客",
    description: "记录技术实践与思考，按分类浏览。",
  },
  {
    value: "note",
    label: "笔记",
    description: "随手记录的想法、摘录与草稿。",
  },
]

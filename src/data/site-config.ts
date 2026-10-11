import type { SiteConfig } from "@/types"

// 唯一个人信息来源。未提供的信息用占位内容，替换后全站生效。
export const siteConfig: SiteConfig = {
  name: "ICE",
  title: "ICE",
  description:
    "个人主页与技术博客，分享关于大模型、Agent、强化学习与后端开发的技术实践与思考。",
  url: "https://example.com",
  author: "ICE",
  email: "2325043156@qq.com",
  github: "https://github.com/ICE0803",
  nav: [
    { label: "首页", href: "/" },
    { label: "博客", href: "/blog" },
    { label: "项目", href: "/projects" },
    { label: "关于", href: "/about" },
    { label: "归档", href: "/archive" },
  ],
  hero: {
    title: "你好，我是 ICE",
    subtitle: "一名软件工程专业的本科生，专注于AI，大模型算法，软件开发。喜欢探索并记录自己的思考",
    buttons: [
      { label: "查看项目", href: "/projects", variant: "primary" },
      { label: "阅读博客", href: "/blog", variant: "ghost" },
    ],
  },
  currently: [
    { label: "大语言模型", detail: "研究推理、上下文与工具调用机制" },
    { label: "Agent", detail: "探索多智能体协作与自主任务执行" },
    { label: "强化学习", detail: "跟进 RLHF 与可验证奖励训练" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/ICE0803", icon: "github" },
    { label: "邮箱", href: "2325043156@qq.com", icon: "mail" },
    { label: "RSS", href: "/rss.xml", icon: "rss" },
  ],
}

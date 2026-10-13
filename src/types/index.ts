export type TocItem = {
  depth: number
  value: string
  href: string
}

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  updatedAt?: string
  category: string
  published: boolean
  featured?: boolean
  readingTime?: number
}

export type ProjectStatus = "active" | "in-progress" | "archived"

export type Project = {
  slug: string
  name: string
  description: string
  techStack: string[]
  status: ProjectStatus
  cover?: string
  github?: string
  demo?: string
  featured?: boolean
}

export type SocialIcon = "github" | "mail" | "rss"

export type SocialLink = {
  label: string
  href: string
  icon: SocialIcon
}

export type NavItem = {
  label: string
  href: string
}

export type HeroButton = {
  label: string
  href: string
  variant: "primary" | "ghost"
}

export type CurrentlyItem = {
  label: string
  detail: string
}

export type SiteConfig = {
  name: string
  title: string
  description: string
  url: string
  author: string
  email: string
  github: string
  nav: NavItem[]
  hero: {
    title: string
    subtitle: string
    buttons: HeroButton[]
  }
  currently: CurrentlyItem[]
  socials: SocialLink[]
}

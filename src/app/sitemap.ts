import type { MetadataRoute } from "next"

import { siteConfig } from "@/data/site-config"
import { getPublishedPosts } from "@/lib/posts"
import { projects } from "@/data/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "")

  const staticPages = ["", "/blog", "/projects", "/about", "/archive"].map(
    (path) => ({ url: `${baseUrl}${path}` }),
  )

  const posts = getPublishedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.date,
  }))

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
  }))

  return [...staticPages, ...posts, ...projectPages]
}

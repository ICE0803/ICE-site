import type { MetadataRoute } from "next"

import { siteConfig } from "@/data/site-config"
import { getPublishedPosts } from "@/lib/content"
import { projects } from "@/data/projects"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, "")

  const staticPages = ["", "/blog", "/projects", "/about"].map(
    (path) => ({ url: `${baseUrl}${path}` }),
  )

  const posts = (await getPublishedPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.date,
  }))

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
  }))

  return [...staticPages, ...posts, ...projectPages]
}

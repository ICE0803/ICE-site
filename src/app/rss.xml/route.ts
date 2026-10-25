import { siteConfig } from "@/data/site-config"
import { getPublishedPosts } from "@/lib/content"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, "")
  const posts = await getPublishedPosts()

  const items = posts
    .map((post) => {
      const link = `${baseUrl}/blog/${post.slug}`
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        "    </item>",
      ].join("\n")
    })
    .join("\n")

  const lastBuildDate = new Date(
    posts[0]?.updatedAt ?? posts[0]?.date ?? Date.now(),
  ).toUTCString()

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(siteConfig.title)}</title>`,
    `    <link>${baseUrl}</link>`,
    `    <description>${escapeXml(siteConfig.description)}</description>`,
    "    <language>zh-CN</language>",
    `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n")

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}

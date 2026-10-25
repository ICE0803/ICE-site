import { revalidatePath, revalidateTag } from "next/cache"

export async function POST(request: Request) {
  const secret = process.env.NOTION_REVALIDATE_SECRET
  const authorization = request.headers.get("authorization")
  if (!secret || authorization !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidateTag("posts", { expire: 0 })
  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath("/blog/[slug]", "page")
  revalidatePath("/search")
  revalidatePath("/sitemap.xml")
  revalidatePath("/rss.xml")
  return Response.json({ revalidated: true })
}

import type { Metadata } from "next"

import { Hero } from "@/components/home/Hero"
import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { LatestPosts } from "@/components/home/LatestPosts"
import { Currently } from "@/components/home/Currently"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <LatestPosts />
      <Currently />
    </>
  )
}

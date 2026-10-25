"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { PanelLeftOpen } from "lucide-react"

import type { Post } from "@/types"
import { BlogNav } from "@/components/blog/blog-nav"
import { Footer } from "@/components/layout/Footer"
import { cn } from "@/lib/utils"

export function BlogLayout({
  posts,
  children,
}: {
  posts: Post[]
  children: ReactNode
}) {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (
    <div
      className={cn(
        "min-w-0 md:grid md:transition-[grid-template-columns] md:duration-300",
        sidebarVisible
          ? "md:grid-cols-[18rem_minmax(0,1fr)] lg:grid-cols-[20rem_minmax(0,1fr)]"
          : "md:grid-cols-[0_minmax(0,1fr)]",
      )}
    >
      <div className={cn("min-w-0", !sidebarVisible && "md:overflow-hidden")}>
        <BlogNav
          posts={posts}
          desktopVisible={sidebarVisible}
          onHide={() => setSidebarVisible(false)}
        />
      </div>

      {!sidebarVisible && (
        <button
          type="button"
          onClick={() => setSidebarVisible(true)}
          aria-label="显示博客侧栏"
          title="显示博客侧栏"
          className="glass glass-hover fixed left-4 top-24 z-40 hidden h-9 w-9 items-center justify-center rounded-full text-foreground md:inline-flex"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      )}

      <div className="min-w-0">
        <div className="container-page min-w-0 py-10 sm:py-12">
          {children}
        </div>
        <Footer blog />
      </div>
    </div>
  )
}

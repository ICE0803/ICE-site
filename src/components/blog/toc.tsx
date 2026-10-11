"use client"

import { useEffect, useState } from "react"

import type { TocItem } from "@/types"
import { cn } from "@/lib/utils"

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -66% 0px" },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="文章目录" className="text-sm">
      <p className="font-medium text-foreground">目录</p>
      <ul className="mt-3 space-y-1">
        {items.map((item) => {
          const active = item.href.slice(1) === activeId
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "block border-l-2 py-1 pl-4 leading-snug transition-colors",
                  item.depth === 3 && "pl-7",
                  item.depth >= 4 && "pl-10",
                  active
                    ? "border-accent text-accent"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {item.value}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

"use client"

import { useEffect, useState } from "react"

import type { TocItem } from "@/types"
import { cn } from "@/lib/utils"

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.href.slice(1) ?? "")

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const updateActive = () => {
      const readingLine = window.scrollY + 120
      const current = headings.findLast(
        (heading) => heading.getBoundingClientRect().top + window.scrollY <= readingLine,
      )
      setActiveId(current?.id ?? headings[0].id)
    }

    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    return () => window.removeEventListener("scroll", updateActive)
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
                onClick={(event) => {
                  const target = document.getElementById(item.href.slice(1))
                  if (!target) return
                  event.preventDefault()
                  target.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                      ? "instant"
                      : "smooth",
                    block: "start",
                  })
                  window.history.replaceState(null, "", item.href)
                  setActiveId(target.id)
                }}
                className={cn(
                  "block border-l-2 py-1 pl-4 leading-snug transition-colors",
                  item.depth === 2 && "pl-7",
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

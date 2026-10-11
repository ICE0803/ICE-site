"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { siteConfig } from "@/data/site-config"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                isActive(item.href) && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="切换导航菜单"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive(item.href) && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

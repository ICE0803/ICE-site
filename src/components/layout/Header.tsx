"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { siteConfig } from "@/data/site-config"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/theme-toggle"

const navItems = siteConfig.nav.filter((item) => item.href !== "/")

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const close = () => setOpen(false)

  const brand = (
    <Link
      href="/"
      onClick={close}
      className="flex shrink-0 items-center gap-2 rounded-full pr-1 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
    >
      <Image
        src="/images/ice-crystal-mark.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 select-none"
        priority
      />
      <span>{siteConfig.name}</span>
    </Link>
  )

  return (
    <header
      data-enter
      style={{ "--rise": "0px", "--dur": "500ms" } as React.CSSProperties}
      className="sticky top-0 z-50"
    >
      <div className="container-page flex justify-center py-4">
        <nav className="glass flex h-14 max-w-full items-center gap-1 rounded-full px-2 backdrop-blur-xl backdrop-saturate-150">
          {brand}

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
                  isActive(item.href) && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="ml-1 flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="切换导航菜单"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="container-page md:hidden">
          <nav className="glass flex flex-col gap-1 rounded-2xl p-2 backdrop-blur-xl backdrop-saturate-150">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
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

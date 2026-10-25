"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/data/site-config"
import { SocialIcon } from "@/components/ui/social-icon"
import { cn } from "@/lib/utils"

const currentYear = new Date().getFullYear()

export function Footer({ blog = false }: { blog?: boolean }) {
  const pathname = usePathname()
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/")
  if (blog !== isBlog) return null

  return (
    <footer className={cn("border-t border-border", blog && "min-w-0")}>
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {siteConfig.socials.map((social) => {
            const internal = social.href.startsWith("/")
            const external = social.href.startsWith("http")
            const content = (
              <>
                <SocialIcon icon={social.icon} className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </>
            )

            if (internal) {
              return (
                <Link
                  key={social.icon}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {content}
                </Link>
              )
            }

            return (
              <a
                key={social.icon}
                href={social.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {content}
              </a>
            )
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          © {currentYear} {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}

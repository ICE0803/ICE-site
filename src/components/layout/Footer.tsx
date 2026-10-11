import Link from "next/link"

import { siteConfig } from "@/data/site-config"
import { SocialIcon } from "@/components/ui/social-icon"

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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

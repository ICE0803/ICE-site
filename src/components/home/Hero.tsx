import Link from "next/link"

import { siteConfig } from "@/data/site-config"
import { SocialIcon } from "@/components/ui/social-icon"
import { cn } from "@/lib/utils"

export function Hero() {
  const socials = siteConfig.socials.filter((s) => s.icon !== "rss")

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {siteConfig.hero.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {siteConfig.hero.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {siteConfig.hero.buttons.map((button) => (
          <Link
            key={button.href}
            href={button.href}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors",
              button.variant === "primary"
                ? "bg-accent text-accent-foreground hover:bg-accent/80"
                : "border border-border text-foreground hover:bg-muted",
            )}
          >
            {button.label}
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-4">
        {socials.map((social) => {
          const external = social.href.startsWith("http")
          return (
            <a
              key={social.icon}
              href={social.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <SocialIcon icon={social.icon} className="h-5 w-5" />
              <span className="sr-only">{social.label}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}

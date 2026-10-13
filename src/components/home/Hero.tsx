import Link from "next/link"
import Image from "next/image"

import { siteConfig } from "@/data/site-config"
import { SocialIcon } from "@/components/ui/social-icon"
import { cn } from "@/lib/utils"

export function Hero() {
  const socials = siteConfig.socials.filter((s) => s.icon !== "rss")

  return (
    <section className="container-page">
      <div className="grid w-full items-center gap-12 py-16 sm:py-20 lg:min-h-[min(calc(100svh-3.5rem),44rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="min-w-0">
          <h1
            data-enter
            style={{ "--d": "80ms" } as React.CSSProperties}
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {siteConfig.hero.title}
          </h1>
          <p
            data-enter
            style={{ "--d": "180ms" } as React.CSSProperties}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {siteConfig.hero.subtitle}
          </p>

          <div
            data-enter
            style={{ "--d": "280ms" } as React.CSSProperties}
            className="mt-9 flex flex-wrap gap-3"
          >
            {siteConfig.hero.buttons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors",
                  button.variant === "primary"
                    ? "bg-accent text-accent-foreground hover:bg-accent/80"
                    : "border border-border text-foreground hover:bg-muted",
                )}
              >
                {button.label}
              </Link>
            ))}
          </div>

          <div
            data-enter
            style={{ "--d": "380ms" } as React.CSSProperties}
            className="mt-10 flex items-center gap-1"
          >
            {socials.map((social) => {
              const external = social.href.startsWith("http")
              return (
                <a
                  key={social.icon}
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="-m-1 inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <SocialIcon icon={social.icon} className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* 图片后的冷调光晕：纯装饰，绝对定位不占布局体积 */}
        <div className="relative min-w-0">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)] blur-2xl"
          />
          <div className="grid">
            <Image
              src="/images/ice-crystal-dark.png"
              alt="ICE 字样三维冰晶"
              width={1774}
              height={887}
              priority
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 448px, (max-width: 1279px) 46vw, 590px"
              data-enter="media"
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="col-start-1 row-start-1 mx-auto block h-auto w-full max-w-md object-contain lg:max-w-none [html[data-theme='light']_&]:hidden"
            />
            <Image
              src="/images/ice-crystal-light.png"
              alt="ICE 字样三维冰晶"
              width={1774}
              height={887}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 448px, (max-width: 1279px) 46vw, 590px"
              data-enter="media"
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="col-start-1 row-start-1 mx-auto hidden h-auto w-full max-w-md object-contain lg:max-w-none [html[data-theme='light']_&]:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

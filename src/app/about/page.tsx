import type { Metadata } from "next"

import { siteConfig } from "@/data/site-config"
import { SocialIcon } from "@/components/ui/social-icon"

export const metadata: Metadata = {
  title: "关于",
  description: `关于 ${siteConfig.name} 的介绍。`,
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="container-page py-14 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight">关于</h1>

      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {siteConfig.hero.subtitle}
      </p>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        {siteConfig.description}
      </p>

      <section data-reveal className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">当前关注</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          {siteConfig.currently.map((item) => (
            <div key={item.label} className="glass rounded-xl p-5">
              <dt className="font-medium">{item.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section data-reveal className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">联系</h2>
        <ul className="mt-4 space-y-3">
          {siteConfig.socials.map((social) => {
            const external = social.href.startsWith("http")
            return (
              <li key={social.icon}>
                <a
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SocialIcon icon={social.icon} className="h-5 w-5" />
                  <span>{social.href.replace(/^mailto:/, "")}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

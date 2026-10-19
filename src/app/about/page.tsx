import type { Metadata } from "next"

import { siteConfig } from "@/data/site-config"
import { SocialIcon } from "@/components/ui/social-icon"
import { TravelSection } from "@/components/travel/travel-section"
import { InterestArchive } from "@/components/interests/interest-archive"

export const metadata: Metadata = {
  title: "关于",
  description: `关于 ${siteConfig.name} 的介绍。`,
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-12">
      <p className="text-[1.875rem] font-semibold leading-tight tracking-tight sm:text-[2.125rem]">
        Dream, Hope, Roam.
      </p>
      <p className="mt-4 text-[1.375rem] leading-snug text-muted-foreground sm:text-[1.5rem]">
        逐梦，怀望，然后远行
      </p>

      <TravelSection />
      <InterestArchive />

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

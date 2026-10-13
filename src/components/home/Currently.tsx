import { siteConfig } from "@/data/site-config"

export function Currently() {
  return (
    <section className="container-page py-16 sm:py-20">
      <h2
        data-reveal
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        当前关注
      </h2>
      <dl className="mt-8 grid gap-5 sm:grid-cols-3">
        {siteConfig.currently.map((item, i) => (
          <div
            key={item.label}
            data-reveal
            style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            className="glass rounded-xl p-6"
          >
            <dt className="font-medium">{item.label}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

import { siteConfig } from "@/data/site-config"

export function Currently() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h2 className="text-xl font-semibold tracking-tight">当前关注</h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {siteConfig.currently.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border bg-muted p-5"
          >
            <dt className="font-medium">{item.label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

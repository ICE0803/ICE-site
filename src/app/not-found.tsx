import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">页面未找到</h1>
      <p className="mt-3 text-muted-foreground">
        你访问的页面不存在，或已被移动。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/80"
      >
        返回首页
      </Link>
    </div>
  )
}

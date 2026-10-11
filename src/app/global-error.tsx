"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="zh-CN">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-medium text-accent">出错了</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            应用发生错误
          </h1>
          <p className="mt-3 text-muted-foreground">
            抱歉，发生了意外错误，请稍后重试。
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/80"
          >
            重试
          </button>
        </div>
      </body>
    </html>
  )
}

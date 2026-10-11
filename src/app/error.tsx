"use client"

import { useEffect } from "react"

export default function Error({
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
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium text-accent">出错了</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">页面加载失败</h1>
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
  )
}

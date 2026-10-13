"use client"

import { usePathname } from "next/navigation"

// 路由变化时 key 改变，main 重新挂载，触发一次淡入。
// 只加透明度与极小位移，不做退出动画，避免破坏后退/前进与滚动位置。
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <main className="flex-1" key={pathname} data-page-transition>
      {children}
    </main>
  )
}

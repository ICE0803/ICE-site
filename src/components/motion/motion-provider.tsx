"use client"

import { useEffect } from "react"

const REVEAL_SELECTOR = "[data-reveal]"

// 已经进入过视口的元素不再重复观察，动画只播一次。
// 同时保证：首屏内本来就可见的内容会被立即标记为显示，不会一直藏着。
function markVisible(el: Element) {
  if (el.getAttribute("data-reveal") === "in") return
  el.setAttribute("data-reveal", "in")
}

export function MotionProvider() {
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-motion")) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          markVisible(entry.target)
          observer.unobserve(entry.target)
        }
      },
      // 底部负边距让元素在稍微进入视口、还没贴到屏幕底边时就出现，
      // 避免用户看到内容"从屏幕边缘冒出来"。
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    )

    const seen = new WeakSet<Element>()

    const register = (el: Element) => {
      if (seen.has(el)) return
      seen.add(el)
      observer.observe(el)
    }

    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.matches(REVEAL_SELECTOR)) {
        register(root)
      }
      root.querySelectorAll(REVEAL_SELECTOR).forEach(register)
    }

    scan(document)

    // 客户端筛选、分页、路由切换都会插入新的 data-reveal 节点，
    // 用 MutationObserver 接管，避免在每个组件里重复写观察逻辑。
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) scan(node as Element)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // 兜底：极端情况下（比如观察器在旧浏览器里对某些节点不触发回调），
    // 一秒后把仍在视口内的元素直接显示出来，宁可没有动画也不能没内容。
    const fallback = window.setTimeout(() => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) markVisible(el)
      })
    }, 1000)

    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}

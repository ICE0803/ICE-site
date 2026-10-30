"use client"

import { useSyncExternalStore } from "react"

export const THEME_STORAGE_KEY = "theme"
export const THEME_EVENT = "themechange"

export type Theme = "light" | "dark"

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark"
}

function getServerSnapshot(): Theme {
  return "dark"
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(THEME_EVENT, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(THEME_EVENT, callback)
  }
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

const TRANSITION_MS = 820
let switching = false
let requestedTheme: Theme | null = null
let requestedOrigin = { x: 0, y: 0 }

async function revealTheme(next: Theme, origin: { x: number; y: number }) {
  const root = document.documentElement
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (reducedMotion.matches) {
    setTheme(next)
    return
  }

  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  ) + 64
  root.style.setProperty("--theme-origin-x", `${origin.x}px`)
  root.style.setProperty("--theme-origin-y", `${origin.y}px`)
  root.style.setProperty("--theme-reveal-end", `${radius}px`)

  let transition: ViewTransition | undefined
  let timer: ReturnType<typeof setTimeout> | undefined
  const stopMotion = () => transition?.skipTransition()
  try {
    if (document.startViewTransition && CSS.supports("mask-image", "radial-gradient(black, transparent)") && "registerProperty" in CSS) {
      root.dataset.themeTransition = "radial"
      transition = document.startViewTransition(() => setTheme(next))
      reducedMotion.addEventListener("change", stopMotion)
      await transition.finished
    } else {
      root.dataset.themeTransition = "fallback"
      // Commit transition styles before changing the tokens they depend on.
      void getComputedStyle(document.body).backgroundColor
      setTheme(next)
      await new Promise<void>((resolve) => {
        timer = setTimeout(resolve, TRANSITION_MS)
      })
    }
  } catch {
    // A superseded snapshot must not discard the user's theme choice.
    setTheme(next)
  } finally {
    if (timer !== undefined) clearTimeout(timer)
    reducedMotion.removeEventListener("change", stopMotion)
    delete root.dataset.themeTransition
    for (const property of ["--theme-origin-x", "--theme-origin-y", "--theme-reveal-end"]) {
      root.style.removeProperty(property)
    }
  }
}

export async function toggleTheme(button: HTMLElement) {
  const rect = button.getBoundingClientRect()
  requestedOrigin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  requestedTheme = (requestedTheme ?? getSnapshot()) === "dark" ? "light" : "dark"
  if (switching) return

  switching = true
  try {
    while (requestedTheme !== getSnapshot()) {
      await revealTheme(requestedTheme, requestedOrigin)
    }
  } finally {
    requestedTheme = null
    switching = false
  }
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    // 存储不可用时忽略，主题仍在本会话内生效
  }
  window.dispatchEvent(new Event(THEME_EVENT))
}

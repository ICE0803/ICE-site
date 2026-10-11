"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"

const STORAGE_KEY = "theme"
const THEME_EVENT = "themechange"

function getSnapshot(): "light" | "dark" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark"
}

function getServerSnapshot(): "light" | "dark" {
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

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // 存储不可用时忽略，主题仍在本会话内生效
    }
    window.dispatchEvent(new Event(THEME_EVENT))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}

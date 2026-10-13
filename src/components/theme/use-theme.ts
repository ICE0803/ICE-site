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

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    // 存储不可用时忽略，主题仍在本会话内生效
  }
  window.dispatchEvent(new Event(THEME_EVENT))
}

"use client"

import { Moon, Sun } from "lucide-react"

import { toggleTheme, useTheme } from "@/components/theme/use-theme"

export function ThemeToggle() {
  const theme = useTheme()

  return (
    <button
      type="button"
      onClick={(event) => void toggleTheme(event.currentTarget)}
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

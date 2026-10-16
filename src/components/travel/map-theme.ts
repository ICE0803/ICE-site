// ECharts 画在 canvas 上，拿不到 CSS 变量和 Tailwind 的类名，
// 所以这里把 globals.css 里的地图 token 读出来，转成 ECharts 需要的颜色值。
// 主题只有一处定义（globals.css），这里只负责读取。
import type { Theme } from "@/components/theme/use-theme"

export interface MapColors {
  surface: string
  tile: string
  tileVisited: string
  visitedStrong: string
  border: string
  hover: string
  selected: string
  glow: string
}

/** 每个 token 的兜底值，对应深色主题；读取失败时也不会画成透明。 */
const fallback: MapColors = {
  surface: "rgba(12, 24, 42, 0.55)",
  tile: "rgba(24, 40, 64, 0.72)",
  tileVisited: "rgba(52, 122, 172, 0.72)",
  visitedStrong: "#a5dcfb",
  border: "rgba(150, 205, 240, 0.22)",
  hover: "#cfeaff",
  selected: "#ffffff",
  glow: "rgba(111, 195, 240, 0.35)",
}

const tokenNames: Record<keyof MapColors, string> = {
  surface: "--map-surface",
  tile: "--map-tile",
  tileVisited: "--map-tile-visited",
  visitedStrong: "--map-visited-strong",
  border: "--map-border",
  hover: "--map-hover",
  selected: "--map-selected",
  glow: "--map-glow",
}

/**
 * 从当前主题的 CSS 变量里读出地图配色。
 * 变量缺失的项回落到深色兜底值，避免画成透明。
 * 调用方需在主题变化后重读，canvas 不会自己跟随 CSS 变量。
 *
 * theme 只在读取失败时决定兜底方向：浅色下若变量整体缺失，
 * 回落到深色值会得到深底深字，因此这里按主题选一组兜底值。
 */
export function readMapColors(theme: Theme): MapColors {
  if (typeof window === "undefined") return theme === "light" ? lightFallback : fallback
  const styles = getComputedStyle(document.documentElement)
  const result = { ...(theme === "light" ? lightFallback : fallback) }
  for (const key of Object.keys(tokenNames) as (keyof MapColors)[]) {
    const value = styles.getPropertyValue(tokenNames[key]).trim()
    // 变量存在就用变量；缺失时保留同主题的兜底值。
    if (value) result[key] = value
  }
  return result
}

const lightFallback: MapColors = {
  surface: "rgba(232, 241, 248, 0.6)",
  tile: "#dbe7f1",
  tileVisited: "#a8d5ef",
  visitedStrong: "#166a9c",
  border: "rgba(24, 92, 132, 0.28)",
  hover: "#0b5d8c",
  selected: "#082f4a",
  glow: "rgba(47, 141, 196, 0.22)",
}

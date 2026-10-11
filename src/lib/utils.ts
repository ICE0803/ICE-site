export type ClassValue = string | number | null | false | undefined

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ")
}

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

export function formatDate(date: string): string {
  return dateFormatter.format(new Date(date))
}

// 估算阅读时长（分钟）：中文按字计，英文按词计，约 300 单位/分钟。
export function readingTime(content: string): number {
  const chinese = content.match(/[一-鿿]/g)?.length ?? 0
  const words = content
    .replace(/[一-鿿]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil((chinese + words) / 300))
}

export interface MovieItem {
  id: string
  title: string
  type: "电影" | "电视剧"
  year: number
  director: string
  cast: string[]
  genres: string[]
  poster?: string
  posterSourceUrl?: string
  description: string
  platform?: string
  watchUrl?: string
  sourceUrl?: string
}

export const movies: MovieItem[] = [
  {
    id: "film-meet-yourself",
    title: "去有风的地方",
    type: "电视剧",
    year: 2023,
    director: "丁梓光",
    cast: ["刘亦菲", "李现"],
    genres: ["田园", "治愈", "爱情", "剧情"],
    poster: "/images/meet-yourself-poster.png",
    description: "许红豆在经历生活低谷后独自前往云南大理休整，在那里结识了返乡创业的谢之遥，并与当地居民和小院中的伙伴们共同经历生活、重新寻找方向。",
    platform: "爱奇艺",
    watchUrl: "https://www.iq.com/album/%E5%8E%BB%E6%9C%89%E9%A3%8E%E7%9A%84%E5%9C%B0%E6%96%B9-2023-18pio58cgit?lang=zh_cn",
    sourceUrl: "https://www.iq.com/album/%E5%8E%BB%E6%9C%89%E9%A3%8E%E7%9A%84%E5%9C%B0%E6%96%B9-2023-18pio58cgit?lang=zh_cn",
  },
]

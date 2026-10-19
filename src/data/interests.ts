import { movies, type MovieItem } from "@/data/movies"
import { siteConfig } from "@/data/site-config"

export type InterestCategory = string

export interface InterestItem {
  id: string
  category: InterestCategory
  title: string
  creator?: string
  description?: string
  cover?: string
  platform?: string
  url?: string
  neteaseSongId?: number
  album?: string
  releaseYear?: number
  sourceUrl?: string
  mediaType?: MovieItem["type"]
  director?: string
  cast?: string[]
  genres?: string[]
}

export const interestCategories = [
  { id: "music", label: "音乐" },
  { id: "artists", label: "艺人" },
  { id: "film", label: "影视" },
  { id: "ai", label: "AI" },
] as const

const musicItems = [
  { title: "漫长的季节", creator: "连麻Swimming / RICHNOMADIC", neteaseSongId: 2155975891, album: "邻家小丈夫", releaseYear: 2024, cover: "https://p1.music.126.net/Dg4tY7L441GZfYqqvWvPUw==/109951169590445432.jpg", description: "从失眠与社交中的伪装写起，在漫长的季节里寻找前行的意义。" },
  { title: "下水道蚂蚁", creator: "连麻Swimming / JinJiBeWater_隼", neteaseSongId: 2006229678, album: "真假美猴王", releaseYear: 2022, cover: "https://p2.music.126.net/ZNxEPHvOXusFZeFQhQ8DPg==/109951168141966141.jpg", description: "以匍匐前进的蚂蚁比喻困境中的自己，回望城市生活、说唱梦想与朋友间的相互支撑。" },
  { title: "没钥匙的锁", creator: "KEY.L刘聪 / c0de731", neteaseSongId: 1405135261, album: "街区故事", releaseYear: 2020, cover: "https://p2.music.126.net/4pb6Z041lTpUjTs3tE8bOA==/109951167893582411.jpg", description: "旧信、出站口与青春往事串起一段分开的回忆，用锁与钥匙的意象写难以放下的关系。" },
  { title: "DAY1", creator: "艾志恒Asen", neteaseSongId: 1492864083, album: "DAY1", releaseYear: 2020, cover: "https://p2.music.126.net/3aBXGrdY0P4dJMbzpCbICg==/109951165439123871.jpg", description: "写给一路同行的伙伴，围绕信任、背叛与音乐理想展开。" },
  { title: "不想回家", creator: "G.E.M.邓紫棋", neteaseSongId: 1970559933, album: "启示录", releaseYear: 2022, cover: "https://p2.music.126.net/5WBF8uSFXhLVjvMOCeqflQ==/109951167859171747.jpg", description: "借夜晚的音乐与陪伴暂避孤独，写不愿独处、又害怕太过清醒的情绪。" },
  { title: "再见（good bye）", creator: "G.E.M.邓紫棋", neteaseSongId: 36024806, album: "新的心跳", releaseYear: 2015, cover: "https://p2.music.126.net/kVwk6b8Qdya8oDyGDcyAVA==/1364493930777368.jpg", description: "从不愿说再见到接受关系终点，用反复变化的告别表达从挽留到释然的过程。" },
  { title: "Where Did U Go", creator: "G.E.M.邓紫棋", neteaseSongId: 234064, album: "G.E.M.", releaseYear: 2008, cover: "https://p1.music.126.net/SRSzJNkVegFlCJVc49VvxQ==/109951163069324876.jpg", description: "以粤语与英语写下对远方恋人的思念，在反复追问去向的旋律中流露等待与牵挂。" },
  { title: "时差雨(Purple Rain)", creator: "BOBBYNOPEACE", neteaseSongId: 3434340340, album: "罪冕", releaseYear: 2026, cover: "https://p2.music.126.net/vdo6DnHm12P0fm6CAbcNsQ==/109951173920123200.jpg", description: "以错位的雨季和紫色雨点串起错过、陪伴与逆境中的坚持，词曲均由 BOBBYNOPEACE 创作。" },
  { title: "很久以后", creator: "G.E.M.邓紫棋", neteaseSongId: 1412263970, album: "摩天动物园", releaseYear: 2019, cover: "https://p1.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg", description: "写一段关系远去后的回望，在时间沉淀中面对遗憾，也慢慢学会放下。" },
  { title: "普通朋友", creator: "陶喆", neteaseSongId: 150623, album: "I'm OK", releaseYear: 1999, cover: "https://p1.music.126.net/tMQXBMTy8pGjGggX1j0YNQ==/109951169389595068.jpg", description: "围绕朋友与恋人之间的距离展开，写面对坦白后仍无法收回的感情；收录于《I'm OK》。" },
].map((song, index): InterestItem => ({
  ...song,
  id: `music-${String(index + 1).padStart(2, "0")}`,
  category: "music",
  platform: "网易云音乐",
  url: `https://music.163.com/song?id=${song.neteaseSongId}`,
  sourceUrl: `https://music.163.com/song?id=${song.neteaseSongId}`,
}))

export interface ArtistItem {
  id: string
  name: string
  image?: string
  imagePosition?: string
  personalReason: string
  role: string
  style: string
  works: string[]
  description: string
  link?: string
}

export const artists: ArtistItem[] = [
  {
    id: "artist-liu-yifei",
    name: "刘亦菲",
    image: "/images/artists/liu-yifei.png",
    imagePosition: "50% 50%",
    personalReason: "",
    role: "演员",
    style: "作品涵盖古装武侠、都市情感与奇幻题材",
    works: ["《仙剑奇侠传》", "《神雕侠侣》", "《梦华录》", "《去有风的地方》"],
    description: "曾饰演《仙剑奇侠传》中的赵灵儿、《神雕侠侣》中的小龙女，以及《梦华录》中的赵盼儿，近年的作品还包括《去有风的地方》。",
  },
  {
    id: "artist-deng-ziqi",
    name: "G.E.M. 邓紫棋",
    image: "/images/artists/deng-ziqi-new.jpeg",
    imagePosition: "50% 42%",
    personalReason: "",
    role: "歌手、词曲创作者",
    style: "流行与 R&B，兼具抒情表达和有力量的演唱",
    works: ["《泡沫》", "《光年之外》", "《摩天动物园》", "《启示录》"],
    description: "G.E.M. 邓紫棋，华语创作女歌手，极具爆发力的铁肺嗓音。代表作《光年之外》《泡沫》，词曲全能，舞台感染力强劲。",
  },
  {
    id: "artist-liu-cong",
    name: "KEY.L 刘聪",
    image: "/images/artists/liu-cong.png",
    imagePosition: "50% 50%",
    personalReason: "",
    role: "说唱歌手、音乐人",
    style: "将旋律说唱与街区叙事结合，关注生活经历与个人情绪",
    works: ["《经济舱》", "《Hey Kong》", "《没钥匙的锁》"],
    description: "KEY.L 刘聪，长沙说唱团体 C-BLOCK 成员，擅长旋律叙事，代表作《Hey Kong》《没钥匙的锁》，细腻嗓音搭配动人 Hook，打造众多中文说唱金曲。",
  },
  {
    id: "artist-lian-ma",
    name: "连麻 Swimming",
    image: "/images/artists/lian-ma.png",
    imagePosition: "50% 50%",
    personalReason: "",
    role: "说唱歌手、音乐人",
    style: "以说唱记录生活处境，在个人叙事中呈现情绪与思考",
    works: ["《漫长的季节》", "《下水道蚂蚁》"],
    description: "连麻 Swimming，成都说唱团体五人组成员。嗓音沙哑富有颗粒感，擅长写实叙事，代表作《自立巷》《漫长的季节》，用说唱描摹市井生活与内心挣扎。",
  },
]

export const interestItems: InterestItem[] = [
  ...musicItems,
  ...movies.map((movie): InterestItem => ({
    id: movie.id,
    category: "film",
    title: movie.title,
    creator: movie.cast[0]+","+movie.cast[1],
    description: movie.description,
    cover: movie.poster,
    platform: movie.platform,
    url: movie.watchUrl,
    sourceUrl: movie.sourceUrl,
    releaseYear: movie.year,
    mediaType: movie.type,
    director: movie.director,
    cast: movie.cast,
    genres: movie.genres,
  })),
  ...siteConfig.currently.map((item, index): InterestItem => ({
    id: `ai-focus-${index + 1}`,
    category: "ai",
    title: item.label,
    creator: item.detail,
  })),
]

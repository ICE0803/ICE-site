"use client"

import dynamic from "next/dynamic"
import { Camera, Compass, MapPinned, Route, type LucideIcon } from "lucide-react"
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react"

import { useTheme } from "@/components/theme/use-theme"
import {
  getAreaVisit,
  getVisitByAdcode,
  provinceIndex,
  travelLabels,
  type TravelAreaVisit,
  type TravelVisit,
} from "@/data/travel"
import { readMapColors, type MapColors } from "./map-theme"
import {
  boundsOf,
  type RegionCollection,
} from "./map-regions"
import {
  DEFAULT_MAP_BOUNDS,
  findProvince,
  NATION_BOUNDS,
  subLevelUrl,
  type ProvinceEntry,
} from "./province-index"

// echarts 体积不小，地图又是页面下方的独立模块，所以按需加载：
// 首屏 HTML 里只有这个占位，等交互内容挂载后再拉地图代码。
const LazyTravelMap = dynamic(
  () => import("./travel-map").then((m) => m.TravelMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">地图加载中…</p>
      </div>
    ),
  },
)

type TravelMapProps = ComponentProps<typeof LazyTravelMap>

/** 只在模块进入视口后才真正挂载 echarts，避免页面打开时就加载整张地图。 */
function TravelMap(props: TravelMapProps) {
  const holderRef = useRef<HTMLDivElement | null>(null)
  // 初始值直接由环境推导（没有 IntersectionObserver 就当作已可见），
  // 这样不必在 effect 里同步 setState，避免级联渲染。
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined",
  )

  useEffect(() => {
    const el = holderRef.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div ref={holderRef} className="h-full w-full">
      {visible ? (
        <LazyTravelMap {...props} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-sm text-muted-foreground">地图加载中…</p>
        </div>
      )}
    </div>
  )
}

const NATION_URL = "/data/china-provinces.json"

/** 行政区信息，从 collection 里的一个 feature 提取。 */
interface Region {
  id: number
  name: string
  kind: string
  visited: boolean
}

type ViewState =
  | { scope: "nation" }
  | { scope: "province"; adcode: number }

/** 从名称尾缀 + 省级配置推导行政区类型（地级市、市辖区、自治州…）。 */
function deriveKind(name: string, adcode: number, province: ProvinceEntry): string {
  // 精确匹配的后缀优先：自治州、盟、地区、林区、自治县、自治旗、新区、堂区。
  if (name.endsWith("自治州")) return "自治州"
  if (name.endsWith("盟")) return "盟"
  if (name.endsWith("地区")) return "地区"
  if (name.endsWith("林区")) return "林区"
  if (name.endsWith("自治县")) return "自治县"
  if (name.endsWith("自治旗")) return "自治旗"
  if (name.endsWith("新区")) return "新区"
  if (name.endsWith("堂区")) return "堂区"

  // 市：先判断 adcode 90 系列（省直辖县级行政区），再按层级区分地级市与县级市。
  if (name.endsWith("市")) {
    const series = Math.floor(adcode / 100) % 100
    if (series === 90) return "县级市"
    return province.subLevel === "city" ? "地级市" : "县级市"
  }

  // 区：市辖区
  if (name.endsWith("区")) return province.subLevel === "district" ? "市辖区" : "区"

  // 县
  if (name.endsWith("县")) return "县"

  // 回落到省级配置的通用称呼
  return province.subLevelLabel
}

/** 从 GeoJSON collection 构建 Region 列表，丢弃 adcode 不是数字的要素。 */
function buildRegions(
  collection: RegionCollection,
  visitedIds: Set<number>,
  province: ProvinceEntry,
): Region[] {
  const seen = new Set<number>()
  return collection.features
    .map((f) => {
      const id = Number(f.properties.adcode)
      if (!Number.isInteger(id) || id < 100000 || id > 999999 || !f.properties.name) return null
      if (province.adcode === 100000 ? !findProvince(id) : Math.floor(id / 10000) !== Math.floor(province.adcode / 10000) || id === province.adcode) return null
      if (seen.has(id)) return null
      seen.add(id)
      const name = f.properties.name ?? ""
      const kind = province.adcode === 100000 ? "省级行政区" : deriveKind(name, id, province)
      const visited = visitedIds.has(id)
      return { id, name, kind, visited }
    })
    .filter((r): r is Region => r !== null)
}

/** 省份名称/adcode -> 可作为 DOM id 的安全字符串。 */
function regionOptionId(scope: string, id: number) {
  return `travel-region-${scope}-${id}`
}

function formatDates(visit: TravelVisit | TravelAreaVisit | undefined): string {
  if (!visit?.dates?.length) return ""
  return visit.dates.join(" · ")
}

const cityLabelExcludedProvinces = new Set([110000, 120000, 310000, 500000, 810000, 820000])

function getProvinceCities(
  visit: TravelVisit | undefined,
  province: ProvinceEntry | undefined,
): string[] {
  if (!visit?.cities?.length || !province || cityLabelExcludedProvinces.has(province.adcode)) return []
  return visit.cities
}

function CityLabels({ visit, province }: { visit: TravelVisit | undefined; province: ProvinceEntry | undefined }) {
  const cities = getProvinceCities(visit, province)
  if (cities.length === 0) return null

  return (
    <ul className="mb-3 flex min-w-0 flex-wrap gap-1.5">
      {cities.map((city) => (
        <li key={city} className="glass-chip rounded-md px-2 py-0.5 text-xs text-muted-foreground">
          {city}
        </li>
      ))}
    </ul>
  )
}

export function TravelSection() {
  const theme = useTheme()
  const [view, setView] = useState<ViewState>({ scope: "nation" })
  const [nationCollection, setNationCollection] = useState<RegionCollection | null>(null)
  const [provinceResult, setProvinceResult] = useState<{
    key: number | null
    status: "idle" | "loading" | "success" | "error"
    collection: RegionCollection | null
  }>({ key: null, status: "idle", collection: null })
  const [nationLoadError, setNationLoadError] = useState(false)

  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [focusId, setFocusId] = useState<number | null>(null)
  const nationSelectionRef = useRef<{ selectedId: number | null; focusId: number | null }>({
    selectedId: null,
    focusId: null,
  })

  const legendRef = useRef<HTMLUListElement | null>(null)
  const [legendKey, setLegendKey] = useState(0)

  // 全国 GeoJSON 在挂载时加载一次，失败时只让地图退化成提示，不影响页面其余部分。
  useEffect(() => {
    let cancelled = false
    fetch(NATION_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: RegionCollection) => {
        if (cancelled) return
        if (!Array.isArray(data?.features) || data.features.length === 0) {
          throw new Error("GeoJSON 结构异常")
        }
        setNationCollection(data)
      })
      .catch(() => {
        if (!cancelled) setNationLoadError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const provinceRequestRef = useRef<AbortController | null>(null)
  useEffect(() => () => provinceRequestRef.current?.abort(), [])

  const loadProvince = useCallback((adcode: number) => {
    provinceRequestRef.current?.abort()
    const controller = new AbortController()
    provinceRequestRef.current = controller
    setProvinceResult({ key: adcode, status: "loading", collection: null })
    fetch(subLevelUrl(adcode), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: RegionCollection) => {
        if (controller.signal.aborted) return
        if (!Array.isArray(data?.features) || data.features.length === 0) {
          throw new Error("GeoJSON 结构异常")
        }
        setProvinceResult((current) =>
          current.key === adcode ? { key: adcode, status: "success", collection: data } : current,
        )
      })
      .catch(() => {
        if (controller.signal.aborted) return
        setProvinceResult((current) =>
          current.key === adcode ? { key: adcode, status: "error", collection: null } : current,
        )
      })
  }, [])

  // 主题切换后重新读一次地图 token：图例与信息卡靠 CSS 变量自动跟随，
  // 地图内部颜色走这里。选中状态存在 React 里，换主题不会丢失。
  const colors: MapColors = useMemo(() => readMapColors(theme), [theme])

  // 图例在窄屏可能换行，换行后地图容器高度变化，触发一次 resize。
  useEffect(() => {
    const el = legendRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(() => setLegendKey((k) => k + 1))
    observer.observe(el)
    return () => observer.disconnect()
  }, [nationCollection, provinceResult.collection])

  const derived = useMemo(() => {
    if (view.scope === "nation") {
      if (!nationCollection) return null
      const scope = "nation"
      const province: ProvinceEntry = {
        name: travelLabels.nationalLabel,
        adcode: 100000,
        subLevelLabel: "省级行政区",
        subLevel: "city",
      }
      const collection = nationCollection
      const visitedIds = new Set<number>()
      for (const entry of provinceIndex) {
        const visit = getVisitByAdcode(entry.adcode, entry.name)
        if (visit && visit.visited !== false) visitedIds.add(entry.adcode)
      }
      const regions = buildRegions(collection, visitedIds, province)
      const matchedIds = new Set(regions.map((region) => region.id))
      for (const id of visitedIds) if (!matchedIds.has(id)) visitedIds.delete(id)
      const total = regions.length
      return { scope, province, collection, bounds: NATION_BOUNDS, visitedIds, total, regions, visit: undefined }
    }

    const adcode = view.adcode
    const province = findProvince(adcode)
    if (!province) return null
    const collection = provinceResult.key === adcode ? provinceResult.collection : null
    const visit = getVisitByAdcode(adcode, province.name)
    const visitedIds = new Set<number>()
    for (const area of visit?.areas ?? []) {
      const matched = getAreaVisit(visit, area.adcode)
      if (matched && matched.visited !== false) visitedIds.add(area.adcode)
    }
    const bounds = province.bounds ?? (collection ? boundsOf(collection.features) : null) ?? DEFAULT_MAP_BOUNDS
    const regions = collection ? buildRegions(collection, visitedIds, province) : []
    const matchedIds = new Set(regions.map((region) => region.id))
    for (const id of visitedIds) if (!matchedIds.has(id)) visitedIds.delete(id)
    const total = regions.length
    return { scope: String(adcode), province, collection, bounds, visitedIds, total, regions, visit }
  }, [view, nationCollection, provinceResult])

  const handleHover = useCallback((id: number | null) => setHoveredId(id), [])

  const handleSelect = useCallback(
    (id: number | null) => {
      if (id === null) return

      if (view.scope === "nation") {
        const province = findProvince(id)
        if (!province) return
        provinceRequestRef.current?.abort()
        if (province.unavailableReason) {
          setProvinceResult({ key: id, status: "idle", collection: null })
        } else {
          loadProvince(id)
        }
        nationSelectionRef.current = { selectedId: id, focusId: id }
        setView({ scope: "province", adcode: id })
        setSelectedId(null)
        setFocusId(null)
        setHoveredId(null)
        return
      }
      setSelectedId(id)
      setFocusId(id)
    },
    [view.scope, loadProvince],
  )

  const handleBack = useCallback(() => {
    const nationSelection = nationSelectionRef.current
    provinceRequestRef.current?.abort()
    setProvinceResult({ key: null, status: "idle", collection: null })
    setView({ scope: "nation" })
    setSelectedId(nationSelection.selectedId)
    setFocusId(nationSelection.focusId)
    setHoveredId(null)

  }, [])

  // 键盘浏览：用列表顺序前后移动，方向键的含义在 aria 文案里说明。
  // 焦点始终停在容器上，由 aria-activedescendant 指向当前行政区，
  // 当前行政区使用悬停描边，并显示名称与状态。
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!derived) return
      const { regions } = derived
      if (regions.length === 0) return

      const current = focusId !== null ? regions.findIndex((r) => r.id === focusId) : -1
      const index = current < 0 ? 0 : current

      const move = (next: number) => {
        const clamped = Math.min(Math.max(next, 0), regions.length - 1)
        const target = regions[clamped]

        setFocusId(target.id)
        setHoveredId(target.id)
      }

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault()
          move(index + 1)
          break
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault()
          move(index - 1)
          break
        case "Home":
          event.preventDefault()
          move(0)
          break
        case "End":
          event.preventDefault()
          move(regions.length - 1)
          break
        case "Enter":
        case " ":
          event.preventDefault()
          if (focusId !== null) {

            handleSelect(focusId)
          } else {

            handleSelect(regions[0].id)
          }
          break
        case "Escape":
          if (view.scope === "province") {
            handleBack()
          } else {
            setSelectedId(null)
            setFocusId(null)
          }
          break
        default:
          break
      }
    },
    [derived, focusId, view, handleSelect, handleBack],
  )

  // 信息卡显示的内容：全国视图看省级记录，省内视图看市级记录。
  const detailRecord = useMemo(() => {
    const activeId = selectedId ?? hoveredId
    if (activeId === null || !derived) return null
    if (view.scope === "nation") {
      const province = findProvince(activeId)
      if (!province) return null
      const visit = getVisitByAdcode(activeId, province.name)
      return { name: province.name, kind: "省级行政区", visit, areaVisit: undefined, province }
    } else {
      const region = derived.regions.find((r) => r.id === activeId)
      if (!region) return null
      const areaVisit = getAreaVisit(derived.visit, activeId)
      return { name: region.name, kind: region.kind, visit: undefined, areaVisit, province: findProvince(view.adcode) }
    }
  }, [selectedId, hoveredId, derived, view])

  const hoveredRegion = derived?.regions.find((region) => region.id === hoveredId)
  const activeProvince = view.scope === "province" ? findProvince(view.adcode) : undefined
  const visitedCount = derived?.visitedIds.size ?? 0
  const totalCount = view.scope === "nation" ? provinceIndex.length : derived?.total ?? 0

  const progressText =
    view.scope === "nation"
      ? travelLabels.progress
          .replace("{visited}", String(visitedCount))
          .replace("{total}", String(totalCount))
      : travelLabels.progressProvince
          .replace("{province}", derived?.province.name ?? "")
          .replace("{visited}", String(visitedCount))
          .replace("{total}", String(totalCount))
          .replace("{unit}", derived?.province.subLevelLabel ?? "")

  const hintText =
    view.scope === "nation"
      ? travelLabels.hint
      : travelLabels.hintProvince.replace("{unit}", derived?.province.subLevelLabel ?? "")

  const activeCollection = view.scope === "nation" ? nationCollection : derived?.collection
  const provinceStatus = view.scope === "province" ? provinceResult.status : "idle"

  return (
    <section data-reveal className="mt-12 w-full max-w-full min-w-0">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <p className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
            {travelLabels.eyebrow}
          </p>
          <h2 className="text-lg font-semibold tracking-tight">{travelLabels.title}</h2>
        </div>
        <p className="font-mono text-xs text-muted-foreground tabular-nums">
          {progressText}
        </p>
      </header>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {travelLabels.subtitle}
      </p>

      {/* 桌面端地图为主、信息卡在侧；窄屏信息卡落到地图下方，优先保证地图可读。 */}
      <div className="glass mt-5 box-border w-full max-w-full min-w-0 rounded-xl p-4 backdrop-blur-md sm:p-5 lg:h-[clamp(35rem,calc(100vh-12rem),38.75rem)]">
        {nationLoadError ? (
          <div className="flex min-h-[20rem] flex-col items-center justify-center gap-2 text-center">
            <p className="font-medium">{travelLabels.errorTitle}</p>
            <p className="text-sm text-muted-foreground">{travelLabels.errorBody}</p>
          </div>
        ) : !nationCollection ? (
          <div className="flex min-h-[20rem] items-center justify-center">
            <p className="text-sm text-muted-foreground">地图加载中…</p>
          </div>
        ) : (
          <div className="grid h-full min-h-0 w-full min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,23.75rem)] lg:items-stretch lg:gap-6">
            <div className="flex h-full min-h-0 min-w-0 flex-col">
              {view.scope === "province" && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span aria-hidden>←</span>
                  <span>{travelLabels.back}</span>
                </button>
              )}

              <ul
                ref={legendRef}
                className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
              >
                <li className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-[3px] border"
                    style={{ background: colors.tileVisited, borderColor: colors.border }}
                  />
                  <span>{travelLabels.legendVisited}</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-[3px] border"
                    style={{ background: colors.tile, borderColor: colors.border }}
                  />
                  <span>{travelLabels.legendUnvisited}</span>
                </li>
                <li className="ml-auto hidden sm:block">{hintText}</li>
              </ul>

              {view.scope === "province" && provinceStatus === "loading" ? (
                <div className="flex h-[20rem] items-center justify-center rounded-lg sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1">
                  <p className="text-sm text-muted-foreground">{travelLabels.loadingProvince}</p>
                </div>
              ) : view.scope === "province" && derived?.province.unavailableReason ? (
                <div className="flex h-[20rem] flex-col items-center justify-center gap-2 rounded-lg text-center sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1">
                  <p className="font-medium">{travelLabels.provinceUnavailable}</p>
                  <p className="text-sm text-muted-foreground">{derived.province.unavailableReason}</p>
                </div>
              ) : view.scope === "province" && provinceStatus === "error" ? (
                <div className="flex h-[20rem] flex-col items-center justify-center gap-3 rounded-lg text-center sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1">
                  <p className="font-medium">{travelLabels.errorTitle}</p>
                  <p className="text-sm text-muted-foreground">{travelLabels.errorBody}</p>
                  <button type="button" onClick={() => loadProvince(view.adcode)} className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted">
                    重试
                  </button>
                </div>
              ) : activeCollection && derived ? (
                <div
                  role="listbox"
                  aria-label={
                    view.scope === "nation"
                      ? "中国省级地图。用方向键浏览省份，回车进入省内地图，Esc 取消选中。"
                      : `${derived.province.name}${derived.province.subLevelLabel}地图。用方向键浏览${derived.province.subLevelLabel}，回车查看记录，Esc 返回全国地图。`
                  }
                  aria-activedescendant={
                    focusId !== null ? regionOptionId(derived.scope, focusId) : undefined
                  }
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  onMouseLeave={() => setHoveredId(null)}
                  onBlur={() => {
                    setHoveredId(null)

                  }}
                  className="relative h-[20rem] w-full touch-pan-y rounded-lg outline-offset-4 select-none sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1"
                  style={{ background: colors.surface }}
                >
                  <TravelMap
                    collection={activeCollection}
                    scope={derived.scope}
                    visitedIds={derived.visitedIds}
                    colors={colors}
                    hoveredId={hoveredId}
                    selectedId={selectedId}
                    onHoverChange={handleHover}
                    onSelectChange={handleSelect}
                    bounds={derived.bounds}
                    relayoutKey={legendKey}
                  />

                  {hoveredRegion && (
                    <p role="status" className="glass-chip pointer-events-none absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-md px-3 py-2 text-xs">
                      {hoveredRegion.name} · {hoveredRegion.kind} · {hoveredRegion.visited ? travelLabels.legendVisited : travelLabels.legendUnvisited}
                    </p>
                  )}

                  {/* 屏幕阅读器可读的行政区选项。地图是 canvas，读屏软件看不到图形，
                      这里补一层语义，id 与 aria-activedescendant 对应。 */}
                  <div className="sr-only">
                    {derived.regions.map((r) => (
                      <span
                        key={r.id}
                        id={regionOptionId(derived.scope, r.id)}
                        role="option"
                        aria-selected={selectedId === r.id}
                        aria-label={`${r.name}，${r.kind}，${r.visited ? "已点亮" : "未点亮"}`}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <DetailPanel
              record={detailRecord}
              province={view.scope === "province" ? activeProvince : undefined}
              areaCount={view.scope === "province" ? visitedCount : 0}
              footprintVisited={visitedCount}
              footprintTotal={totalCount}
              countPending={view.scope === "province" && !activeCollection}
              visit={view.scope === "province" ? derived?.visit : undefined}
              onClear={() => {
                setSelectedId(null)
                setHoveredId(null)
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

interface DetailPanelProps {
  record: {
    name: string
    kind: string
    visit: TravelVisit | undefined
    areaVisit: TravelAreaVisit | undefined
    province: ProvinceEntry | undefined
  } | null
  province: ProvinceEntry | undefined
  visit: TravelVisit | undefined
  areaCount: number
  footprintVisited: number
  footprintTotal: number
  countPending: boolean
  onClear: () => void
}

function TravelCover({ name, src }: { name: string; src?: string }) {
  const [showImage, setShowImage] = useState(Boolean(src))

  return (
    <div className="travel-cover mt-4 flex min-h-40 max-h-[20rem] items-center justify-center overflow-hidden rounded-lg border border-border/60 px-2">
      {showImage && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name}旅行记录封面`}
          className="block h-auto max-h-full w-auto max-w-full object-contain"
          onError={() => setShowImage(false)}
        />
      ) : (
        <div className="flex h-full min-h-40 w-full flex-col items-center justify-center gap-2 px-4 text-center text-muted-foreground">
          <span aria-hidden className="travel-cover-mark h-8 w-12 rounded-md border" />
          <span className="text-xs">{travelLabels.coverPlaceholder}</span>
        </div>
      )}
    </div>
  )
}

function TravelThemeItem({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0">
      <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} />
      <div className="min-w-0">
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function DetailPanel({
  record,
  province,
  visit,
  areaCount,
  footprintVisited,
  footprintTotal,
  countPending,
  onClear,
}: DetailPanelProps) {
  const provinceOverview = !record && province
  const displayedRecord = record ?? (province ? {
    name: province.name,
    kind: "省级行政区",
    visit,
    areaVisit: undefined,
    province,
  } : null)
  if (!displayedRecord) {
    return (
      <aside
        aria-live="polite"
        className="glass-chip flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl p-4 text-sm lg:h-full"
      >
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
              TRAVEL JOURNAL
            </p>
            <h3 className="mt-2 max-w-[16rem] text-lg font-semibold leading-snug tracking-tight">
              每一段旅程，都值得被记录。
            </h3>
            <p className="mt-2 max-w-[19rem] text-xs leading-relaxed text-muted-foreground">
              从地图出发，收藏走过的城市与沿途的风景。
            </p>
          </div>
          <Compass aria-hidden className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} />
        </div>

        <div className="mt-7 space-y-3">
          <TravelThemeItem
            icon={MapPinned}
            title="探索足迹"
            description="点击地图上的省份，查看对应地区的旅行记录。"
          />
          <TravelThemeItem
            icon={Camera}
            title="收藏风景"
            description="用照片与文字，留住旅途中的风景和记忆。"
          />
          <TravelThemeItem
            icon={Route}
            title="持续点亮"
            description="每一次新的出发，都会让这张地图更加完整。"
          />
        </div>

        <div className="mt-auto border-t border-border/60 pt-5">
          <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
            MY TRAVEL FOOTPRINT
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-accent">
              {footprintVisited} / {footprintTotal}
            </span>
            <span className="text-xs text-muted-foreground">个已点亮的省级行政区</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            点击任意省份，开启一段旅行回忆。
          </p>
        </div>
      </aside>
    )
  }

  const { name, kind, visit: provinceVisit, areaVisit, province: recordProvince } = displayedRecord
  const activeVisit = areaVisit ?? provinceVisit
  const provinceCities = getProvinceCities(provinceVisit, recordProvince)
  const dates = activeVisit ? formatDates(activeVisit) : ""
  const hasVisit = Boolean(activeVisit && activeVisit.visited !== false)
  const description = activeVisit?.description ?? activeVisit?.notes

  return (
    <aside aria-live="polite" className="glass-chip flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl p-4 text-sm lg:h-full">
      <div className="shrink-0 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
            {kind === "省级行政区" ? "PROVINCE ARCHIVE" : "CITY ARCHIVE"}
          </p>
          <h3 className="mt-1 break-words font-semibold tracking-tight">{name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <span>{kind}</span>
            <span aria-hidden>·</span>
            <span className={hasVisit ? "text-accent" : undefined}>
              {hasVisit ? travelLabels.legendVisited : travelLabels.legendUnvisited}
            </span>
          </div>
        </div>
        {record && <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          清除
        </button>}
      </div>

      <TravelCover key={activeVisit?.cover ?? "placeholder"} name={name} src={activeVisit?.cover} />

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1 leading-relaxed">
        {provinceOverview && (
          <p className="mb-3 text-xs text-muted-foreground">
            {countPending
              ? `已登记的${province.subLevelLabel}数量待边界数据校验。`
              : travelLabels.visitedAreasSummary
                  .replace("{count}", String(areaCount))
                  .replace("{unit}", province.subLevelLabel)}
          </p>
        )}
        {!hasVisit || !activeVisit ? (
          <p className="text-muted-foreground">{travelLabels.unvisitedBody}</p>
        ) : (
          <>
            {description ? <p className="mb-3 whitespace-pre-wrap break-words text-foreground/90">{description}</p> : null}
            {dates && (
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono tabular-nums">{dates}</span>
              </div>
            )}
            <CityLabels visit={provinceVisit} province={recordProvince} />
            {!description && !dates && provinceCities.length === 0 && !activeVisit.photos?.length && (
              <p className="text-muted-foreground">{travelLabels.unvisitedNoDetail}</p>
            )}
            {activeVisit.photos?.length ? (
              <ul className="grid grid-cols-3 gap-2">
                {activeVisit.photos.map((photo) => (
                  <li key={photo.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt ?? `${name}照片`}
                      className="aspect-square w-full rounded-md border border-border/60 object-cover"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </div>
    </aside>
  )
}

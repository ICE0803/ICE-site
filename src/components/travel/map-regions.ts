import type { MapColors } from "./map-theme"

/** 一个可绘制、可点击的行政区。全国视图装省级，省内视图装地级市等。 */
export interface MapRegion {
  /** 匹配用的唯一标识：全国视图是省级 adcode，省内视图是下一级 adcode */
  id: number
  /** 显示与悬停时读出的名称 */
  name: string
  /** 行政区类型（省级 / 地级市 / 自治州 / 地区 / 市辖区…），没有就留空 */
  kind?: string
  /** 是否有旅行记录 */
  visited: boolean
  /** 键盘焦点环的落点，归一化到 [0, 1]，相对当前可视范围 */
  point?: { x: number; y: number }
}

/** 供 echarts 注册的行政区边界集合，字段与 GeoJSON 对齐。 */
export interface RegionFeature {
  properties: {
    name?: string
    adcode?: number | string
    center?: number[]
    centroid?: number[]
    level?: string
  }
}

export interface RegionCollection {
  features: RegionFeature[]
}

/** 名称 -> echarts 里注册的地图名，两者一一对应。 */
export function mapNameFor(scope: string) {
  return `travel-${scope}`
}

/** 名称 -> DOM id 的安全形式，用于 aria-activedescendant。 */
export function regionOptionId(scope: string, id: number) {
  return `travel-region-${scope}-${id}`
}

interface BuildOptions {
  regions: RegionFeature[]
  /** id -> 是否有记录 */
  visitedIds: Set<number>
  hoveredId: number | null
  selectedId: number | null
  colors: MapColors
  /** 是否按经纬度包围盒铺满容器；省内视图需要，全国视图交给缩放的插图 */
  bounds?: [number, number, number, number]
}

/**
 * 把区域集合合成一次 setOption 的数据。
 * 配色、悬停、选中全部由受控状态决定，echarts 自带的 emphasis/select 一律关掉，
 * 这样「有记录 / 悬停 / 选中」三种状态互不覆盖。
 */
export function buildMapSeries({ regions, visitedIds, hoveredId, selectedId, colors, bounds }: BuildOptions) {
  const data = regions
    .filter((f) => f.properties.name)
    .map((f) => {
      const id = Number(f.properties.adcode)
      const visited = visitedIds.has(id)
      const isSelected = id === selectedId
      const isHovered = id === hoveredId

      // 悬停只动描边与投影，填充保持不变，避免整块颜色跳变。
      const areaColor = visited ? colors.tileVisited : colors.tile

      return {
        name: f.properties.name as string,
        value: visited ? 1 : 0,
        itemStyle: {
          areaColor,
          borderColor: isSelected ? colors.selected : isHovered ? colors.hover : colors.border,
          borderWidth: isSelected ? 2 : isHovered ? 1.6 : 0.6,
          // 只在有强调时才投影，未交互的区域保持平面，避免整张图发灰。
          shadowBlur: isSelected ? 12 : isHovered ? 8 : 0,
          shadowColor: isSelected ? colors.selected : colors.glow,
        },
      }
    })

  return {
    type: "map" as const,
    roam: false,
    selectedMode: false,
    label: { show: false },
    emphasis: { disabled: true },
    select: { disabled: true },
    itemStyle: {
      areaColor: colors.tile,
      borderColor: colors.border,
      borderWidth: 0.6,
    },
    ...(bounds ? { boundingCoords: [[bounds[0], bounds[3]], [bounds[2], bounds[1]]] } : {}),
    data,
  }
}

// ── 经纬度 → 屏幕比例 ─────────────────────────────────────────
// echarts 默认用墨卡托投影，纬度方向要按投影后的值算比例，
// 直接把纬度线性归一化会让南北偏移。下面这组换算同时用于
// 键盘焦点环的落点。

/** 墨卡托投影后的纵坐标（无量纲，只用于比值）。 */
function mercatorY(lat: number) {
  return Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * (180 / Math.PI)
}

export interface Projection {
  toPoint(lon: number, lat: number): { x: number; y: number }
}

/** 给定可视经纬度范围，返回经纬度到 [0,1] 比例的投影。 */
export function projectionOf(bounds: [number, number, number, number]): Projection {
  const [minLon, minLat, maxLon, maxLat] = bounds
  const yTop = mercatorY(maxLat)
  const yBottom = mercatorY(minLat)
  const spanX = maxLon - minLon || 1
  const spanY = yTop - yBottom || 1
  return {
    toPoint(lon, lat) {
      return {
        x: (lon - minLon) / spanX,
        y: (yTop - mercatorY(lat)) / spanY,
      }
    },
  }
}

/** 取要素中心点：优先 centroid（视觉重心），退回 center（政府驻地）。 */
export function featureCenter(f: RegionFeature): [number, number] | null {
  const c = f.properties.centroid ?? f.properties.center
  if (Array.isArray(c) && typeof c[0] === "number" && typeof c[1] === "number") {
    return [c[0], c[1]]
  }
  return null
}

/** 计算一组要素的合并经纬度包围盒（含所有环，不只外环）。 */
export function boundsOf(features: RegionFeature[]): [number, number, number, number] | null {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  const walk = (c: unknown) => {
    if (typeof c === "number") return
    if (Array.isArray(c) && typeof c[0] === "number" && typeof c[1] === "number") {
      const [x, y] = c as [number, number]
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
      return
    }
    if (Array.isArray(c)) for (const item of c) walk(item)
  }
  for (const f of features) {
    walk((f as { geometry?: { coordinates?: unknown } }).geometry?.coordinates)
  }
  if (!Number.isFinite(minX)) return null
  return [minX, minY, maxX, maxY]
}

/**
 * 全国视图右下角的南海诸岛插图。
 *
 * 主图按 NATION_BOUNDS 裁掉了北纬 17 度以南，那片岛礁不能因此消失。
 * 这里单独注册一张只含岛礁的地图，挂到第二个 geo 组件上，
 * 摆在主图右下角并与主图分离 —— 投影仍交给 echarts，形状不失真。
 * 岛礁没有省级记录可挂，因此整套 silent，不参与悬停与选中。
 */
export interface InsetOptions {
  /** 插图 geo 组件名，由调用方注册对应的地图 */
  geoName: string
  /** 岛礁的经纬度包围盒 */
  bounds: [number, number, number, number]
  colors: MapColors
}

export function buildInsetOption({ geoName, bounds, colors }: InsetOptions) {
  const [minLon, minLat, maxLon, maxLat] = bounds
  const itemStyle = {
    areaColor: colors.tile,
    borderColor: colors.border,
    borderWidth: 0.6,
  }
  const inert = { silent: true, emphasis: { disabled: true }, select: { disabled: true } }

  return {
    geo: [
      {
        map: geoName,
        boundingCoords: [
          [minLon, maxLat],
          [maxLon, minLat],
        ],
        // 缩到右下角，给主图让出空间；高度由宽度与投影比例决定。
        left: "80%",
        bottom: "5%",
        width: "16%",
        aspectScale: 1,
        itemStyle,
        ...inert,
      },
    ],
    series: [
      {
        type: "map" as const,
        map: geoName,
        geoIndex: 0,
        data: [],
        itemStyle,
        ...inert,
      },
    ],
  }
}


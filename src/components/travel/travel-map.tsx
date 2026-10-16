"use client"

import { useEffect, useMemo, useRef } from "react"
import {
  init,
  registerMap,
  // echarts 的按需注册函数叫 use，会被 eslint 误认为 React Hook，这里改名。
  use as registerEchartsModules,
  type EChartsType,
} from "echarts/core"
import { MapChart, type MapSeriesOption } from "echarts/charts"
import { GeoComponent, TooltipComponent } from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"

import type { MapColors } from "./map-theme"
import { buildInsetOption, buildMapSeries, mapNameFor } from "./map-regions"

registerEchartsModules([MapChart, GeoComponent, TooltipComponent, CanvasRenderer])

/** 与 GeoJSON 对齐的最小结构，够 echarts 画图与这里取数即可。 */
interface RegionFeature {
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

interface TravelMapProps {
  /** 当前层级要画的行政区边界，由调用方取数，组件本身不发请求。 */
  collection: RegionCollection
  /** 当前层级的唯一标识，用于注册 echarts 地图名，全国与省内互不覆盖。 */
  scope: string
  /** 有旅行记录的行政区 adcode。 */
  visitedIds: Set<number>
  colors: MapColors
  /** 悬停与选中都由父组件持有，保证与图例、信息卡同步。 */
  hoveredId: number | null
  selectedId: number | null
  onHoverChange: (id: number | null) => void
  onSelectChange: (id: number) => void
  /**
   * 可视范围的经纬度包围盒 [minLon, minLat, maxLon, maxLat]。
   * 全国视图用它切掉南海诸岛以下的大片空白，把大陆放大；
   * 省内视图用它把该省铺满容器。
   */
  bounds: [number, number, number, number]
  /** 布局变化（图例换行导致容器高度变化）时触发一次 resize。 */
  relayoutKey?: unknown
}

/**
 * 只负责绘制地图并派发交互事件，不渲染任何文案，
 * 因此不需要知道当前主题，也不需要知道当前是全国还是省内 ——
 * 配色由 colors 传入，区域由 collection 决定。
 */
export function TravelMap({
  collection,
  scope,
  visitedIds,
  colors,
  hoveredId,
  selectedId,
  onHoverChange,
  onSelectChange,
  bounds,
  relayoutKey,
}: TravelMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<EChartsType | null>(null)

  // 回调放 ref，避免父组件重渲染时 echarts 实例被重建。
  // 在 effect 里更新而不是渲染期赋值，渲染期改 ref 会破坏并发渲染的假设。
  const handlers = useRef({ onHoverChange, onSelectChange })
  useEffect(() => {
    handlers.current = { onHoverChange, onSelectChange }
  }, [onHoverChange, onSelectChange])

  // echarts 的事件回调只给名称，这里反查成 adcode，
  // 后续所有匹配都走 id，不再依赖中文名称。
  const idByName = useMemo(() => {
    const map = new Map<string, number>()
    for (const f of collection.features) {
      const name = f.properties.name
      const id = Number(f.properties.adcode)
      if (name && Number.isFinite(id)) map.set(name, id)
    }
    return map
  }, [collection])

  const seriesOption = useMemo<MapSeriesOption>(
    () =>
      buildMapSeries({
        regions: collection.features,
        visitedIds,
        hoveredId,
        selectedId,
        colors,
        bounds,
      }) as MapSeriesOption,
    [collection, visitedIds, colors, hoveredId, selectedId, bounds],
  )

  // 建实例并注册地图。collection 不会变化，所以这里只跑一次。
  // 全国视图额外注册一张只含南海诸岛的地图，用于右下角的插图。
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    registerMap(mapNameFor(scope), collection as never)

    // 全国视图：把没有名称的要素（南海诸岛附属岛礁）单独注册成一张地图。
    if (scope === "nation") {
      const islandsFeatures = collection.features.filter((f) => !f.properties.name)
      if (islandsFeatures.length > 0) {
        const islandsCollection = { ...collection, features: islandsFeatures }
        registerMap(mapNameFor("nation-islands"), islandsCollection as never)
      }
    }

    const chart = init(el, undefined, { renderer: "canvas" })
    chartRef.current = chart

    const idFromParams = (params: { name?: unknown }) => {
      const name = typeof params.name === "string" ? params.name : ""
      // 南海诸岛附属要素没有名称，忽略，不参与悬停与选中。
      return idByName.get(name) ?? null
    }

    chart.on("mouseover", (params) => handlers.current.onHoverChange(idFromParams(params)))
    chart.on("mouseout", () => handlers.current.onHoverChange(null))
    chart.on("click", (params) => {
      const id = idFromParams(params)
      if (id !== null) handlers.current.onSelectChange(id)
    })

    // 容器尺寸变化（窗口缩放、字体加载完成）后重绘，避免边界被拉伸。
    const observer = new ResizeObserver(() => {
      if (!chart.isDisposed()) chart.resize()
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
      chart.dispose()
      chartRef.current = null
    }
  }, [collection, scope, idByName])

  // 主题、悬停、选中或层级变化时只更新图形属性，不重建实例。
  // 全国视图同时更新南海诸岛插图。
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    const option: {
      series: MapSeriesOption[]
      geo?: ReturnType<typeof buildInsetOption>["geo"]
    } = {
      series: [{ name: scope, map: mapNameFor(scope), ...seriesOption }],
    }

    // 全国视图：计算南海诸岛的包围盒并附加 geo 组件绘制右下角插图。
    if (scope === "nation") {
      const islandsFeatures = collection.features.filter((f) => !f.properties.name)
      if (islandsFeatures.length > 0) {
        let minLon = Infinity
        let minLat = Infinity
        let maxLon = -Infinity
        let maxLat = -Infinity
        for (const f of islandsFeatures) {
          const walk = (c: unknown): void => {
            if (Array.isArray(c) && typeof c[0] === "number" && typeof c[1] === "number") {
              const [lon, lat] = c as [number, number]
              if (lon < minLon) minLon = lon
              if (lon > maxLon) maxLon = lon
              if (lat < minLat) minLat = lat
              if (lat > maxLat) maxLat = lat
            } else if (Array.isArray(c)) {
              for (const item of c) walk(item)
            }
          }
          walk((f as { geometry?: { coordinates?: unknown } }).geometry?.coordinates)
        }
        if (Number.isFinite(minLon)) {
          const insetBounds: [number, number, number, number] = [minLon, minLat, maxLon, maxLat]
          const inset = buildInsetOption({
            geoName: mapNameFor("nation-islands"),
            bounds: insetBounds,
            colors,
          })
          option.geo = inset.geo
          option.series.push(inset.series[0] as MapSeriesOption)
        }
      }
    }

    chart.setOption(option)
  }, [seriesOption, scope, collection, colors])

  useEffect(() => {
    chartRef.current?.resize()
  }, [relayoutKey])

  return <div ref={containerRef} className="h-full w-full" />
}

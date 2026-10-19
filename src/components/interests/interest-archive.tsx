"use client"

import Image from "next/image"
import { ExternalLink, Info, X } from "lucide-react"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type FocusEvent, type PointerEvent as ReactPointerEvent } from "react"
import { createPortal } from "react-dom"

import { artists, interestCategories, interestItems, type ArtistItem, type InterestItem } from "@/data/interests"

const artistEntries: InterestItem[] = artists.map((artist) => ({
  id: artist.id,
  category: "artists",
  title: artist.name,
}))

function externalUrl(value?: string) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}

function coverUrl(value?: string) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : externalUrl(value)
}

export function InterestArchive() {
  const [category, setCategory] = useState<string>("music")
  const [preview, setPreview] = useState<{ item: InterestItem; anchor: HTMLElement } | null>(null)
  const [visible, setVisible] = useState(false)
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const removeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const items = useMemo(() => interestItems.filter((item) => item.category === category), [category])

  const clearTimers = useCallback(() => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
    clearTimeout(removeTimer.current)
  }, [])

  const close = useCallback(() => {
    clearTimers()
    setVisible(false)
    removeTimer.current = setTimeout(() => setPreview(null), 180)
  }, [clearTimers])

  const show = (item: InterestItem, anchor: HTMLElement, immediate = false) => {
    clearTimers()
    openTimer.current = setTimeout(() => {
      setPreview({ item, anchor })
      setVisible(true)
    }, immediate ? 0 : 70)
  }

  const leave = () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(close, 200)
  }

  const keep = () => {
    clearTimers()
    setVisible(true)
  }

  useEffect(() => () => clearTimers(), [clearTimers])

  useEffect(() => {
    if (!preview) return
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.activeElement?.closest(".interest-preview")) preview.anchor.focus()
        close()
      }
    }
    const outside = (event: globalThis.PointerEvent) => {
      const target = event.target as Node
      if (!preview.anchor.contains(target) && !(target instanceof Element && target.closest(".interest-preview"))) close()
    }
    document.addEventListener("keydown", keydown)
    document.addEventListener("pointerdown", outside)
    return () => {
      document.removeEventListener("keydown", keydown)
      document.removeEventListener("pointerdown", outside)
    }
  }, [preview, close])

  const selectCategory = (id: string) => {
    close()
    setCategory(id)
  }

  return (
    <section data-reveal className="interest-archive mt-12 sm:mt-16" aria-labelledby="interest-archive-title">
      <div className="interest-header flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="min-w-0 shrink-0">
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-accent">PERSONAL ARCHIVE</p>
          <h2 id="interest-archive-title" className="mt-2 text-2xl font-semibold tracking-tight">兴趣档案</h2>
        </div>
        <div className="interest-category-list flex w-full flex-row flex-nowrap items-center gap-3 overflow-x-auto sm:w-auto" role="tablist" aria-label="兴趣分类">
          {interestCategories.map((item, index) => (
            <button
              key={item.id}
              id={`interest-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              aria-controls="interest-panel"
              tabIndex={category === item.id ? 0 : -1}
              className="interest-tab w-auto shrink-0 rounded-sm px-3 py-2 text-left text-sm"
              onClick={() => selectCategory(item.id)}
              onKeyDown={(event) => {
                let next = index
                if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % interestCategories.length
                else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + interestCategories.length) % interestCategories.length
                else if (event.key === "Home") next = 0
                else if (event.key === "End") next = interestCategories.length - 1
                else return
                event.preventDefault()
                selectCategory(interestCategories[next].id)
                document.getElementById(`interest-tab-${interestCategories[next].id}`)?.focus()
              }}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={`mx-auto mt-9 w-full ${category === "artists" ? "max-w-none" : "max-w-[47.5rem]"}`}>
        <div id="interest-panel" role="tabpanel" aria-labelledby={`interest-tab-${category}`} tabIndex={0} className="rounded-sm">
          {category === "artists" ? (
            <ul className="artist-gallery interest-list">
              {artists.map((artist, index) => (
                <li key={artist.id}>
                  <ArtistPortrait artist={artist} selected={preview?.item.id === artist.id && visible} onShow={(anchor) => show(artistEntries[index], anchor, true)} onLeave={leave} />
                </li>
              ))}
            </ul>
          ) : (
            <div key={category} className="interest-list">
              {items.length ? (
                <ol>
                  {items.map((item, index) => {
                    const url = externalUrl(item.url)
                    const selected = preview?.item.id === item.id && visible
                    const handlers = {
                      onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => {
                        if (event.pointerType === "mouse") show(item, event.currentTarget)
                      },
                      onPointerLeave: leave,
                      onFocus: (event: FocusEvent<HTMLElement>) => show(item, event.currentTarget),
                      onBlur: leave,
                    }
                    return (
                      <li key={item.id} className="interest-row flex min-h-11 items-center gap-3 py-2 sm:min-h-12 sm:gap-5">
                        <span aria-hidden className="w-6 shrink-0 pt-1 font-mono text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                        <div className="min-w-0 flex-1">
                          {url ? (
                            <a {...handlers} href={url} target="_blank" rel="noopener noreferrer" className="interest-title" aria-describedby={selected ? "interest-preview-content" : undefined}>
                              <span>{item.title}{item.creator?.trim() && <span className="interest-creator"> — {item.creator}</span>}</span>
                              <ExternalLink aria-label="在新标签页打开" className="interest-external-link ml-2 inline h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <button {...handlers} type="button" className="interest-title text-left" aria-expanded={selected} aria-controls={selected ? "interest-preview-content" : undefined} onClick={(event) => show(item, event.currentTarget, true)}>
                              {item.title}{item.creator?.trim() && <span className="interest-creator"> — {item.creator}</span>}
                            </button>
                          )}
                        </div>
                        {url && (
                          <button type="button" aria-label={`预览${item.title}`} aria-expanded={selected} className="interest-info rounded-full p-2 text-muted-foreground" onClick={(event) => show(item, event.currentTarget, true)}>
                            <Info aria-hidden className="h-4 w-4" />
                          </button>
                        )}
                      </li>
                    )
                  })}
                </ol>
              ) : <p className="py-6 text-sm text-muted-foreground">这一栏还在慢慢收集。</p>}
            </div>
          )}
        </div>
      </div>
      {preview && createPortal(
        <InterestPreview key={preview.item.id} item={preview.item} anchor={preview.anchor} visible={visible} onEnter={keep} onLeave={leave} onClose={close} />,
        document.body,
      )}
    </section>
  )
}

function ArtistPortrait({ artist, selected, onShow, onLeave }: {
  artist: ArtistItem
  selected: boolean
  onShow: (anchor: HTMLElement) => void
  onLeave: () => void
}) {
  const [failed, setFailed] = useState(false)
  const image = coverUrl(artist.image)

  return (
    <button
      type="button"
      className="artist-card group w-full text-left"
      aria-expanded={selected}
      aria-controls={selected ? "interest-preview-content" : undefined}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") onShow(event.currentTarget) }}
      onPointerLeave={onLeave}
      onFocus={(event) => onShow(event.currentTarget)}
      onBlur={onLeave}
      onClick={(event) => onShow(event.currentTarget)}
    >
      <span className="artist-portrait relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl">
        {image && !failed ? (
          <Image key={image} src={image} alt={`${artist.name}的人物照片`} fill unoptimized sizes="(max-width: 639px) 45vw, 280px" className="object-cover" style={{ objectPosition: artist.imagePosition ?? "50% 50%" }} onError={() => setFailed(true)} />
        ) : (
          <span className="flex flex-col items-center gap-3 px-4 text-center">
            <span aria-hidden className="text-3xl font-light tracking-widest text-accent/60">{artist.name.slice(0, 1)}</span>
            <span className="text-xs text-muted-foreground">等待放入人物照片</span>
          </span>
        )}
      </span>
      <span className="mt-4 block text-base font-medium tracking-wide transition-colors group-hover:text-accent group-focus-visible:text-accent">{artist.name}</span>
    </button>
  )
}

function InterestPreview({ item, anchor, visible, onEnter, onLeave, onClose }: {
  item: InterestItem
  anchor: HTMLElement
  visible: boolean
  onEnter: () => void
  onLeave: () => void
  onClose: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [failed, setFailed] = useState(false)
  const cover = coverUrl(item.cover)
  const artist = artists.find((entry) => entry.id === item.id)
  const url = externalUrl(artist?.link ?? item.url)

  useLayoutEffect(() => {
    const update = () => {
      const card = ref.current
      if (!card) return
      const viewport = window.visualViewport
      const width = viewport?.width ?? window.innerWidth
      const height = viewport?.height ?? window.innerHeight
      const offsetTop = viewport?.offsetTop ?? 0
      const offsetLeft = viewport?.offsetLeft ?? 0
      const rect = anchor.getBoundingClientRect()
      const bounds = card.getBoundingClientRect()
      const above = rect.top - offsetTop - 12
      const below = offsetTop + height - rect.bottom - 12
      const top = below >= bounds.height || below >= above ? rect.bottom + 12 : rect.top - bounds.height - 12
      setPosition({
        top: Math.max(offsetTop + 12, Math.min(top, offsetTop + height - bounds.height - 12)),
        left: Math.max(offsetLeft + 12, Math.min(rect.left, offsetLeft + width - bounds.width - 12)),
      })
    }
    update()
    const observer = new ResizeObserver(update)
    if (ref.current) observer.observe(ref.current)
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    window.visualViewport?.addEventListener("resize", update)
    window.visualViewport?.addEventListener("scroll", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
      window.visualViewport?.removeEventListener("resize", update)
      window.visualViewport?.removeEventListener("scroll", update)
    }
  }, [anchor])

  return (
    <aside ref={ref} id="interest-preview-content" aria-label={`${item.title}详情预览`} className={`interest-preview ${artist ? "artist-preview" : ""} glass rounded-2xl p-5 backdrop-blur-2xl`} data-visible={visible && position !== null} style={{ top: position?.top ?? 0, left: position?.left ?? 0 }} onPointerEnter={onEnter} onPointerLeave={onLeave} onFocus={onEnter} onBlur={onLeave}>
      <button type="button" aria-label="关闭预览" onClick={onClose} className="absolute right-2 top-2 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"><X aria-hidden className="h-3.5 w-3.5" /></button>
      <div className="flex items-start gap-4">
        {artist ? (
          <div className="min-w-0 flex-1 pr-3">
            <h3 className="break-words text-lg font-semibold leading-snug">{artist.name}</h3>
            <p className="mt-2 break-words text-xs font-medium text-accent">{artist.role}</p>
            <p className="mt-2 break-words text-xs text-muted-foreground">{artist.style}</p>
            <p className="mt-3 break-words text-sm leading-relaxed text-muted-foreground">{artist.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">代表作品：{artist.works.join("、")}</p>
            {artist.personalReason.trim() && <p className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-foreground">喜欢的原因：{artist.personalReason}</p>}
            {url && <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-xs text-accent">艺人主页<ExternalLink aria-hidden className="h-3 w-3" /></a>}
          </div>
        ) : (
          <>
            {cover && (
              <div className={`interest-cover relative flex w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm sm:w-28 ${item.category === "film" ? "aspect-[736/934]" : "h-24 sm:h-28"}`}>
                {failed ? <span className="font-mono text-2xl text-accent/60" aria-label="封面暂不可用">{item.title.slice(0, 1)}</span> : <Image src={cover} alt={`${item.title}封面`} fill unoptimized sizes="112px" className="object-contain" onError={() => setFailed(true)} />}
              </div>
            )}
            <div className="min-w-0 flex-1 pr-3">
              <h3 className="break-words text-base font-semibold leading-snug">{item.title}</h3>
              {item.creator?.trim() && <p className="mt-1.5 break-words text-xs text-muted-foreground">{item.category === "film" ? `主演：${item.cast?.join("、") ?? item.creator}` : item.creator}</p>}
              {(item.album || item.releaseYear) && <p className="mt-1.5 break-words text-xs text-muted-foreground">{[item.album, item.releaseYear].filter(Boolean).join(" · ")}</p>}
              {item.description?.trim() && <p className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
              {url && <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-xs text-accent">{item.category === "film" ? `在${item.platform ?? "正版平台"}打开` : "在网易云音乐打开"}<ExternalLink aria-hidden className="h-3 w-3" /></a>}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

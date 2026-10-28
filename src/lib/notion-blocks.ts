type RichText = {
  plain_text?: string
  href?: string | null
  annotations?: { bold?: boolean; italic?: boolean; strikethrough?: boolean; code?: boolean }
}

type Block = {
  id?: string
  type: string
  children?: Block[]
  [key: string]: unknown
}

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\")
    .replace(/([{}<>\[\]*_!~|])/g, "\\$1")
    .replace(/(^|\n)([ \t]*)(#{1,6}(?=\s)|>|(?:[-+]|\d+\.)(?=\s))/g,
      (_match, start: string, spaces: string, marker: string) => `${start}${spaces}\\${marker}`)
}

function safeUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString().replace(/[()]/g, (char) => char === "(" ? "%28" : "%29") : undefined
  } catch {
    return undefined
  }
}

function text(value: RichText[] = []): string {
  return value.map((item) => {
    const raw = item.plain_text ?? ""
    let result = escapeText(raw).replace(/`/g, "\\`")
    const annotations = item.annotations
    if (annotations?.code) {
      const fence = "`".repeat(Math.max(1, ...(raw.match(/`+/g) ?? []).map((run) => run.length + 1)))
      result = `${fence}${raw.includes("`") ? ` ${raw} ` : raw}${fence}`
    } else {
      if (annotations?.bold) result = `**${result}**`
      if (annotations?.italic) result = `*${result}*`
      if (annotations?.strikethrough) result = `~~${result}~~`
    }
    const href = safeUrl(item.href)
    return href ? `[${result}](${href})` : result
  }).join("")
}

function richText(block: Block): RichText[] {
  return (block[block.type] as { rich_text?: RichText[] } | undefined)?.rich_text ?? []
}

function imageUrl(block: Block): string | undefined {
  const image = block.image as {
    type?: string
    external?: { url?: string }
    file?: { url?: string }
  } | undefined
  if (!image || typeof image !== "object") return undefined

  if (image.type === "external") return safeUrl(image.external?.url)
  if (image.type === "file") {
    const id = block.id ?? ""
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
      ? `/api/notion/images/${id}`
      : undefined
  }
  return undefined
}

function imageAlt(block: Block): string {
  const image = block.image as { caption?: RichText[] } | undefined
  const raw = text(image?.caption ?? [])
  return raw.replace(/\\([{}<>\[\]*_!~|])/g, "$1").replace(/`/g, "")
}

function render(blocks: Block[], depth = 0): string {
  const fragments: string[] = []
  let list: string[] = []
  let listType = ""
  const flush = () => {
    if (list.length) fragments.push(list.join("\n"))
    list = []
    listType = ""
  }

  for (const block of blocks) {
    const content = text(richText(block))
    const indent = "  ".repeat(depth)
    if (["bulleted_list_item", "numbered_list_item", "to_do"].includes(block.type)) {
      if (listType && listType !== block.type) flush()
      listType = block.type
      const checked = (block.to_do as { checked?: boolean } | undefined)?.checked
      const marker = block.type === "bulleted_list_item" ? "-" : block.type === "numbered_list_item" ? `${list.length + 1}.` : `- [${checked ? "x" : " "}]`
      const children = block.children?.length ? `\n${render(block.children, depth + 1).replace(/\n\n/g, "\n")}` : ""
      list.push(`${indent}${marker} ${content}${children}`)
      continue
    }
    flush()
    let result = ""
    switch (block.type) {
      case "paragraph": result = content; break
      case "heading_1": result = `# ${content}`; break
      case "heading_2": result = `## ${content}`; break
      case "heading_3": result = `### ${content}`; break
      case "quote":
      case "callout": result = content.split("\n").map((line) => `> ${line}`).join("\n"); break
      case "code": {
        const value = block.code as { rich_text?: RichText[]; language?: string } | undefined
        const source = (value?.rich_text ?? []).map((part) => part.plain_text ?? "").join("")
        const fence = "`".repeat(Math.max(3, ...(source.match(/`+/g) ?? []).map((run) => run.length + 1)))
        const language = /^[a-zA-Z0-9_+.-]+$/.test(value?.language ?? "") ? value?.language : "text"
        result = `${fence}${language}\n${source}\n${fence}`
        break
      }
      case "equation": {
        const expression = (block.equation as { expression?: string } | undefined)?.expression
        if (expression) result = `$$\n${expression.replace(/[{}<>]/g, (char) => `\\${char}`)}\n$$`
        break
      }
      case "image": {
        const image = imageUrl(block)
        if (image) {
          const alt = imageAlt(block)
          result = `![${alt}](${image})`
        }
        break
      }
      case "divider": result = "---"; break
      case "bookmark":
      case "link_preview": {
        const url = safeUrl((block[block.type] as { url?: string } | undefined)?.url)
        if (url) result = `[${url}](${url})`
        break
      }
      case "table": {
        const rows = (block.children ?? []).filter((child) => child.type === "table_row").map((row) =>
          ((row.table_row as { cells?: RichText[][] } | undefined)?.cells ?? []).map((cell) => text(cell).replace(/\|/g, "\\|")))
        if (rows.length) result = rows.map((row, index) => `| ${row.join(" | ")} |${index === 0 ? `\n| ${row.map(() => "---").join(" | ")} |` : ""}`).join("\n")
        break
      }
    }
    if (result) fragments.push(result.split("\n").map((line) => `${indent}${line}`).join("\n"))
    if (block.children?.length && block.type !== "table") fragments.push(render(block.children, depth + 1))
  }
  flush()
  return fragments.filter(Boolean).join("\n\n")
}

export function notionBlocksToMarkdown(blocks: Block[]): string {
  return render(blocks).trim()
}

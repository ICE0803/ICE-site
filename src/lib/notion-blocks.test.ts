import assert from "node:assert/strict"
import test from "node:test"

import { notionBlocksToMarkdown } from "./notion-blocks.ts"

test("renders grouped and nested lists", () => {
  const markdown = notionBlocksToMarkdown([
    { type: "numbered_list_item", numbered_list_item: { rich_text: [{ plain_text: "first" }] }, children: [
      { type: "bulleted_list_item", bulleted_list_item: { rich_text: [{ plain_text: "child" }] } },
    ] },
    { type: "numbered_list_item", numbered_list_item: { rich_text: [{ plain_text: "second" }] } },
  ])
  assert.equal(markdown, "1. first\n  - child\n2. second")
})

test("renders tables, code, equations and only stable images", () => {
  const markdown = notionBlocksToMarkdown([
    { type: "table", children: [
      { type: "table_row", table_row: { cells: [[{ plain_text: "Name" }], [{ plain_text: "Value" }]] } },
      { type: "table_row", table_row: { cells: [[{ plain_text: "A" }], [{ plain_text: "B" }]] } },
    ] },
    { type: "code", code: { language: "js", rich_text: [{ plain_text: "const x = 1" }] } },
    { type: "equation", equation: { expression: "E=mc^2" } },
    { type: "image", image: { type: "file", file: { url: "https://expired.example/image" } } },
    { type: "image", image: { type: "external", external: { url: "https://example.com/image.png" } } },
  ])
  assert.match(markdown, /\| Name \| Value \|\n\| --- \| --- \|\n\| A \| B \|/)
  assert.match(markdown, /```js\nconst x = 1\n```/)
  assert.match(markdown, /\$\$\nE=mc\^2\n\$\$/)
  assert.doesNotMatch(markdown, /expired/)
  assert.match(markdown, /!\[\]\(https:\/\/example.com\/image.png\)/)
})

test("keeps literal Markdown markers out of Notion text", () => {
  const markdown = notionBlocksToMarkdown([
    { type: "paragraph", paragraph: { rich_text: [{ plain_text: "# title\n- item\n```js\n{run()}" }] } },
  ])
  assert.match(markdown, /\\# title/)
  assert.match(markdown, /\\- item/)
  assert.match(markdown, /\\`\\`\\`js/)
  assert.match(markdown, /\\\{run\(\)\\\}/)
})

test("does not turn plain text into MDX expressions or elements", () => {
  const markdown = notionBlocksToMarkdown([
    { type: "paragraph", paragraph: { rich_text: [{ plain_text: "<script>alert(1)</script> {globalThis.process.env} [link](javascript:alert(1))" }] } },
    { type: "paragraph", paragraph: { rich_text: [{ plain_text: "click", href: "javascript:alert(1)" }] } },
  ])
  assert.match(markdown, /\\<script\\>/)
  assert.match(markdown, /\\\{globalThis.process.env\\\}/)
  assert.match(markdown, /\\\[link\\\]/)
  assert.doesNotMatch(markdown, /\[click\]\(javascript:/)
})

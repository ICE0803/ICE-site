import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkFlexibleToc from "remark-flexible-toc"
import rehypeSlug from "rehype-slug"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import type { PluggableList } from "unified"

export const mdxOptions: {
  remarkPlugins: PluggableList
  rehypePlugins: PluggableList
} = {
  remarkPlugins: [remarkGfm, remarkMath, [remarkFlexibleToc, { maxDepth: 4 }]],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
    rehypeKatex,
  ],
}

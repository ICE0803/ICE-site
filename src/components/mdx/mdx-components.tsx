import Link from "next/link"
import type { MDXComponents } from "next-mdx-remote-client/rsc"

import { CodeBlock } from "./code-block"

export const mdxComponents: MDXComponents = {
  pre: CodeBlock,
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("http") || href.startsWith("#")) {
      const external = href.startsWith("http")
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      )
    }
    return <Link href={href}>{children}</Link>
  },
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} loading="lazy" className="rounded-lg" />
  ),
  table: (props) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
}

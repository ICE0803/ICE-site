import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev-mode route/compile badge overlapped the page's own floating controls.
  devIndicators: false,
  // rehype-pretty-code/shiki calls Date.now() internally, which Cache Components
  // rejects during prerendering. Static blog content gains nothing from it.
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // rehype-pretty-code/shiki calls Date.now() internally, which Cache Components
  // rejects during prerendering. Static blog content gains nothing from it.
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

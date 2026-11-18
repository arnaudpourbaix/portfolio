import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // lib/resume.ts lit content/resume avec node:fs : chemins dynamiques que le traçage ne voit pas tout seul.
  outputFileTracingIncludes: {
    "/**": ["./content/resume/**/*.md"],
  },
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

/** @type {import("@stylexjs/nextjs-plugin").stylexPlugin} */
import stylexPlugin from '@stylexjs/nextjs-plugin'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/** @type {import("~/env.js").env } */
const env = await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@stylexjs/open-props"],
  webpack: (config) => {
    // Grab the existing rule that handles SVG imports
    // @ts-expect-error No way I gonna write types for configuring webpack
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

console.log(import.meta.dirname)

export default stylexPlugin({
  dev: env.NODE_ENV === "development",
  rootDir: import.meta.dirname,
})(config);

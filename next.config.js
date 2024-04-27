import path from 'path'
import stylexPlugin from '@stylexjs/nextjs-plugin'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const env = await import("./src/env.js");

const config = {
  transpilePackages: ["@stylexjs/open-props"]
}

export default stylexPlugin({
  dev: env.NODE_ENV === "development",
  rootDir: import.meta.dirname,
})(config);

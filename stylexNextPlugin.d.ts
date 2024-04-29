declare module "@stylexjs/nextjs-plugin" {
  import type { NextConfig } from "next"
  export function stylexPlugin({
    dev: boolean,
    rootDir: string,
  }): (NextConfig) => NextConfig
  export default stylexPlugin
}

declare module "@stylexjs/nextjs-plugin" {
  import type { NextConfig } from "next"
  type Unstable_moduleResolution = {
    type: "commonJS",
    rootDir: string,
  }
  type BabelConfig = {
    babelrc: boolean,
  }
  type Config = {
    dev?: boolean,
    rootDir?: string,
    runtimeInjection?: boolean,
    genConditionalClasses?: boolean,
    treeshakeCompensation?: boolean,
    useRemForFontSize?: boolean,
    unstable_moduleResolution?: Unstable_moduleResolution,
    babelConfig?: BabelConfig,

  }
  export function stylexPlugin(Config): (NextConfig) => NextConfig

  export default stylexPlugin
}

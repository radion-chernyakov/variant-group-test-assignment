import * as stylex from "@stylexjs/stylex"
import { type ComponentProps, type ReactNode } from "react"

import Text from "../Text"
import { colors, paddings } from "../tokens.stylex"

type Size = Extract<ComponentProps<typeof Text>["size"], "xLarge" | "large">

export default function PageHeader({
  children,
  colorVariant,
  size = "xLarge",
  controls,
}: {
  children: ReactNode
  colorVariant?: ComponentProps<typeof Text>["colorVariant"]
  size?: Size
  controls?: ReactNode
}) {
  const paddingStyle = paddingSizeMap[size]
  return (
    <div {...stylex.props(styles.container, paddingStyle)}>
      <Text as="h1" size={size} weight="bold" colorVariant={colorVariant}>
        {children}
      </Text>
      {controls}
    </div>
  )
}

const styles = stylex.create({
  container: {
    borderColor: {
      default: colors.gray75,
      "@media (prefers-color-scheme: dark)": colors.gray700,
    },
    borderStyle: "solid",
    borderWidth: `0px 0px 1px 0px`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xLargePadding: {
    paddingBlockEnd: paddings.xSmall,
  },
  largePadding: {
    paddingBlockEnd: paddings.xxSmall,
  },
})

const paddingSizeMap: Record<Size, stylex.StyleXStyles> = {
  xLarge: styles.xLargePadding,
  large: styles.largePadding,
}

import * as stylex from "@stylexjs/stylex"
import { type StyleXStyles } from "@stylexjs/stylex/lib/StyleXTypes"
import { type ComponentProps, type ElementType, type ReactNode } from "react"

import { colors } from "../tokens.stylex"
import {
  sizeTokens,
  weightTokens,
  smallLineHeight,
  colorTokens,
} from "./tokens.stylex"

export type Size = "xSmall" | "small" | "medium" | "large" | "xLarge"

type Weight = "light" | "normal" | "medium" | "semibold" | "bold"

type TextAlign = "center"

type ColorScheme = "default" | "danger" | "inherit"

type ColorVariant = "default" | "light"

type ColorProps =
  | {
      colorScheme?: undefined
      colorVariant?: ColorVariant
    }
  | {
      colorScheme?: Exclude<ColorScheme, "inherit">
      colorVariant?: ColorVariant
    }
  | {
      colorScheme: "inherit"
      colorVariant?: undefined
    }

// https://www.totaltypescript.com/pass-component-as-prop-react

type DistributiveOmit<
  T,
  TOmitted extends PropertyKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = T extends any ? Omit<T, TOmitted> : never

type CustomProps<T> = {
  size?: Size
  weight?: Weight
  children: ReactNode
  style?: StyleXStyles
  as?: T
  textAlign?: TextAlign
} & ColorProps

type Props<T extends ElementType> = CustomProps<T> &
  Exclude<
    DistributiveOmit<ComponentProps<T>, keyof CustomProps<T>>,
    "className" | "style"
  >

export default function Text<T extends ElementType>({
  size = "medium",
  weight = "normal",
  children,
  style,
  as,
  textAlign,
  colorScheme = "default",
  colorVariant = "default",
  ...restProps
}: Props<T>) {
  const sizeTheme = sizeMap[size]
  const weightTheme = weightMap[weight]

  const colorTheme =
    colorScheme !== "inherit" && colorMap[colorScheme][colorVariant]

  const ElementType = as ?? "p"

  return (
    <ElementType
      {...restProps}
      {...stylex.props(
        weightTheme,
        sizeTheme,
        colorTheme,
        styles.base,
        textAlign && textAlignMap[textAlign],
        style,
      )}
    >
      {children}
    </ElementType>
  )
}

const styles = stylex.create({
  base: {
    color: {
      "@media (prefers-color-scheme: light)": colorTokens.color,
      "@media (prefers-color-scheme: dark)": colorTokens.colorDarkMode,
    },
    fontVariationSettings: "'wdth' 80",
    fontWeight: weightTokens.fontWeight,
    fontSize: sizeTokens.fontSize,
    lineHeight: sizeTokens.lineHeight,
  },
  alignCenter: {
    textAlign: "center",
  },
})

const textAlignMap: Record<TextAlign, stylex.StyleXStyles> = {
  center: styles.alignCenter,
}

const lineHeightMap: Record<Size, number> = {
  xSmall: 20,
  small: smallLineHeight,
  medium: 28,
  large: 44,
  xLarge: 60,
}

export const getLineHeight = (size: Size) => lineHeightMap[size]

const xSmallSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "14px",
  lineHeight: `${lineHeightMap.xSmall}px`,
})

const mediumSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "18px",
  lineHeight: `${lineHeightMap.medium}px`,
})

const largeSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "36px",
  lineHeight: `${lineHeightMap.large}px`,
})

const xLargeSizeTheme = stylex.createTheme(sizeTokens, {
  fontSize: "48px",
  lineHeight: `${lineHeightMap.xLarge}px`,
})

const sizeMap = {
  xSmall: xSmallSizeTheme,
  small: undefined,
  medium: mediumSizeTheme,
  large: largeSizeTheme,
  xLarge: xLargeSizeTheme,
}

const lightWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 300,
})

const mediumWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 500,
})
const semiboldWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 600,
})
const boldWeightTheme = stylex.createTheme(weightTokens, {
  fontWeight: 700,
})

const weightMap = {
  light: lightWeightTheme,
  normal: undefined,
  medium: mediumWeightTheme,
  semibold: semiboldWeightTheme,
  bold: boldWeightTheme,
}

const lightDefaultColor = stylex.createTheme(colorTokens, {
  color: colors.gray300,
  colorDarkMode: colors.gray200,
})

const defaultDefaultColor = stylex.createTheme(colorTokens, {
  color: colors.gray700,
  colorDarkMode: colors.gray50,
})

const lightDangerColor = stylex.createTheme(colorTokens, {
  color: colors.red400,
  colorDarkMode: colors.red200,
})

const defaultDangerColor = stylex.createTheme(colorTokens, {
  color: colors.red900,
  colorDarkMode: colors.red400,
})

const colorMap = {
  default: {
    default: defaultDefaultColor,
    light: lightDefaultColor,
  },
  danger: {
    default: defaultDangerColor,
    light: lightDangerColor,
  },
}

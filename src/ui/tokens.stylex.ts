import * as stylex from "@stylexjs/stylex"

type ScreenWidth = {
  xSmall: 320,
  small: 480,
  medium: 768,
  large: 1024
  xLarge: 1200
  xxLarge: 1440
}

type GenericQuery<Width extends Record<string, number>, QueryType extends string> = {
  [Property in keyof Width]: `@${QueryType} (max-width: ${Width[Property]}px)`;
};

export type MediaQuery = GenericQuery<ScreenWidth, 'media'>
export type ContainerQuery = GenericQuery<ScreenWidth, 'container'>

export const borderRadius = stylex.defineVars({
  control: "6px",
  section: "12px",
})

export const colors = stylex.defineVars({
  green50: "#edfcf2",
  green100: "#73E2A3",
  green150: "#87d999",
  green200: "#7ed08f",
  green300: "#39b860",
  green400: "#009743",
  green500: "#087443",
  green600: "#005422",
  green700: "#00200c",
  green800: "#003211",
  green900: "#021d09",
  gray50: "#F2F4F7",
  gray100: "#D0D5DD",
  gray150: "#C6C7CB",
  gray200: "#bdbdbd",
  gray300: "#98A2B3",
  gray400: "#667085",
  gray500: "#475467",
  gray600: "#4c4c4c",
  gray700: "#344054",
  gray800: "#292929",
  gray900: "#101828",
  red50: "#ffebe9",
  red100: "#fee4e2",
  red150: "#f2b6b1",
  red200: "#fda29b",
  red300: "#ff776d",
  red400: "#F04438",
  red500: "#b72e30",
  red600: "#891e20",
  red700: "#663029",
  red800: "#530f10",
  red900: "#350700",
})

export const backgroundColors = stylex.defineVars({
  gray: {
    default: colors.gray50,
    "@media (prefers-color-scheme: dark)": colors.gray700,
  },
  green: {
    default: colors.green50,
    "@media (prefers-color-scheme: dark)": colors.green700,
  },
})

export const spacing = stylex.defineVars({
  xSmall: "6px",
  small: "8px",
  medium: "12px",
  normal: "16px",
  large: "24px",
  xLarge: "32px",
  xxLarge: "48px",
})

export const paddings = stylex.defineVars({
  xxSmall: "12px",
  xSmall: "16px",
  small: "24px",
  medium: "32px",
  large: "54px",
  xLarge: "64px",
})

export const inputsTokens = stylex.defineVars({
  fontSize: "16px",
  lineHeight: "24px",
  backgroundColor: {
    default: null,
    "@media (prefers-color-scheme: dark)": colors.gray900,
  },
  color: {
    default: colors.gray900,
    "@media (prefers-color-scheme: dark)": colors.gray150,
  },
  borderRadius: borderRadius.control,
  borderWidth: "1px",
  borderColor: {
    default: colors.gray100,
    "@media (prefers-color-scheme: dark)": colors.gray700,
  },
  borderColorFocus: {
    default: colors.green100,
    "@media (prefers-color-scheme: dark)": colors.green600,
  },
  borderColorInvalid: {
    default: colors.red200,
    "@media (prefers-color-scheme: dark)": colors.red500,
  },
  borderStyle: "solid",
  outline: "none",
  boxShadow: {
    default: `0px 0px 0px 4px ${colors.green50}`,
    "@media (prefers-color-scheme: dark)": `0px 0px 0px 4px ${colors.green600}`
  },
  boxShadowInvalid: {
    default: `0px 0px 0px 4px ${colors.red100}`,
    "@media (prefers-color-scheme: dark)": `0px 0px 0px 4px ${colors.red600}`,
  },
  placeholderColor: colors.gray400,
})

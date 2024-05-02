import * as stylex from "@stylexjs/stylex"

export const borderRadius = stylex.defineVars({
  control: "6px",
  section: "12px",
})

export const colors = stylex.defineVars({
  green50: "#edfcf2",
  green100: "#73E2A3",
  green200: "#7ed08f",
  green300: "#39b860",
  green400: "#009743",
  green500: "#087443",
  green600: "#005422",
  green700: "#003211",
  green800: "#021d09",
  gray50: "#F2F4F7",
  gray100: "#D0D5DD",
  gray200: "#bdbdbd",
  gray300: "#98A2B3",
  gray400: "#667085",
  gray500: "#475467",
  gray600: "#4c4c4c",
  gray700: "#292929",
  gray800: "#344054",
  gray900: "#101828", // check is it fits into 800
  gray25: "#C6C7CB", // find proper number for this guy too
  red50: "#ffebe9",
  red100: "#fee4e2",
  red200: "#fda29b",
  red300: "#ff776d",
  red400: "#F04438",
  red500: "#b72e30",
  red600: "#891e20",
  red700: "#530f10",
  red800: "#350700",
}) // #667085

export const spacing = stylex.defineVars({
  xSmall: "6px",
  small: "8px",
  medium: "12px",
  normal: "16px",
  large: "24px",
  xLarge: "32px",
})

export const inputsTokens = stylex.defineVars({
  fontSize: "16px",
  lineHeight: "24px",
  color: colors.gray900,
  borderRadius: borderRadius.control,
  borderWidth: "1px",
  borderColor: colors.gray100,
  borderColorFocus: colors.green100,
  borderColorInvalid: colors.red200,
  borderStyle: "solid",
  outline: "none",
  boxShadow: `0px 0px 0px 4px ${colors.green50}`,
  boxShadowInvalid: `0px 0px 0px 4px ${colors.red100}`,
  placeholderColor: colors.gray400,
})

export const tmp = stylex.defineVars({
  size: stylex.types.resolution("100px")
})
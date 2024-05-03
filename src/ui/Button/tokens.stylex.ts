import * as stylex from "@stylexjs/stylex"

import { colors, spacing } from "../tokens.stylex"

export const baseButtonTokens = stylex.defineVars({
  borderWidth: `1px`,
})

export const buttonSize = stylex.defineVars({
  gap: spacing.medium,
  paddingVertical: "16px",
  paddingHorizontal: "28px",
})

export const buttonIntent = stylex.defineVars({
  focusRing: colors.green500,
  color: "white",
  colorDisabled: colors.gray300,
  colorHover: colors.gray50,
  borderColor: colors.green500,
  borderColorDisabled: colors.gray100,
  borderColorHover: colors.green400,
  backgroundColor: colors.green500,
  backgroundColorDisabled: colors.gray100,
  backgroundColorHover: colors.green400,
})

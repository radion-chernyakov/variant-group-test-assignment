import * as stylex from "@stylexjs/stylex"

import { spacing } from "../tokens.stylex"

export const baseButtonTokens = stylex.defineVars({
  borderWidth: `1px`,
})

export const buttonSize = stylex.defineVars({
  gap: spacing.medium,
  paddingVertical: "unset",
  paddingHorizontal: "unset",
})

export const buttonIntent = stylex.defineVars({
  focusRingColor: "unset",
  color: "unset",
  colorDisabled: "unset",
  colorHover: "unset",
  borderColor: "unset",
  borderColorDisabled: "unset",
  borderColorHover: "unset",
  backgroundColor: "unset",
  backgroundColorDisabled: "unset",
  backgroundColorHover: "unset",
})

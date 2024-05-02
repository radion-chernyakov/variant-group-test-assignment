import * as stylex from "@stylexjs/stylex"
import { colors } from "../tokens.stylex"

export const smallLineHeight = 16

export const sizeTokens = stylex.defineVars({
  fontSize: `${smallLineHeight}x`,
  lineHeight: "24px",
})

export const weightTokens = stylex.defineVars({
  fontWeight: 400,
})

export const colorTokens = stylex.defineVars({
  color: "unset",
})

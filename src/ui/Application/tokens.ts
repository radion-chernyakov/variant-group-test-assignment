import * as stylex from "@stylexjs/stylex"
import { backgroundColors } from "../tokens.stylex"

export const tokens = stylex.defineVars({
  backgroundColor: {
    default: backgroundColors.gray,
    ":hover": backgroundColors.grayHover,
  }
})
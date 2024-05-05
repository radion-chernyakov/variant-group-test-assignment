import * as stylex from "@stylexjs/stylex"
import { type ReactNode } from "react"

export default function VisuallyHidden({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.container)}>{children}</div>
}

const styles = stylex.create({
  container: {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
})

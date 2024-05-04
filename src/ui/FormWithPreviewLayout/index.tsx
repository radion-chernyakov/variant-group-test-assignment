import * as stylex from "@stylexjs/stylex"
import { type ReactNode } from "react"

import { spacing, type MediaQuery } from "../tokens.stylex"

export default function FormWithPreviewLayout({
  form,
  preview,
}: {
  form: ReactNode
  preview: ReactNode
}) {
  return (
    <div {...stylex.props(styles.container)}>
      {form}
      {preview}
    </div>
  )
}

const mediumMediaQuery: MediaQuery["medium"] = "@media (max-width: 768px)"

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr 1fr",
      [mediumMediaQuery]: "1fr",
    },
    gridTemplateRows: {
      default: null,
      [mediumMediaQuery]: "max-content minmax(600px, max-content)",
    },
    gap: spacing.xLarge,
    flexGrow: "1",
  },
})

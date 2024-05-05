import * as stylex from "@stylexjs/stylex"
import { type ReactNode } from "react"

import { paddings, spacing, type MediaQuery } from "../tokens.stylex"

export default function FormWithPreviewLayout({
  form,
  preview,
}: {
  form: ReactNode
  preview: ReactNode
}) {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.formContainer)}>{form}</div>
      {preview}
    </div>
  )
}

const mediumMediaQuery: MediaQuery["medium"] = "@media (max-width: 768px)"
const smallMediaQuery: MediaQuery["small"] = "@media (max-width: 480px)"

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
  formContainer: {
    position: "sticky",
    top: paddings.medium,
    alignSelf: "start",
    paddingBlockEnd: {
      default: null,
      [mediumMediaQuery]: paddings.xxSmall,
    },
  },
})

import * as stylex from "@stylexjs/stylex"
import { Suspense, type ReactNode } from "react"
import ApplicationsCounter from "~/applications/ApplicationCounter"
import Header from "~/ui/Header"

import { spacing } from "../../ui/tokens.stylex"

export default function ApplicationsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div {...stylex.props(styles.container)}>
      <Header
        userSection={
          <Suspense>
            <ApplicationsCounter />
          </Suspense>
        }
      />
      <main {...stylex.props(styles.main)}>{children}</main>
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: "flex",
    gap: spacing.xLarge,
    flexDirection: "column",
    flexGrow: "1",
  },
  main: {
    display: "flex",
    flexGrow: "1",
  },
})

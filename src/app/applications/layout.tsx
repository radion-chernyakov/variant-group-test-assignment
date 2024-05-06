import * as stylex from "@stylexjs/stylex"
import Link from "next/link"
import { Suspense, type ReactNode } from "react"
import ApplicationsCounter from "~/applications/ApplicationCounter"
import ApplicationHeader from "~/ui/ApplicationHeader"
import Text from "~/ui/Text"

import { spacing } from "../../ui/tokens.stylex"

export default function ApplicationsLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <div {...stylex.props(styles.container)}>
      <ApplicationHeader
        userSection={
          <Suspense>
            <ApplicationsCounter />
          </Suspense>
        }
      />
      <main {...stylex.props(styles.main)}>{children}</main>
      {modal}
      <footer>
        <Link scroll={false} href="/applications/settings">
          <Text>Settings</Text>
        </Link>
      </footer>
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

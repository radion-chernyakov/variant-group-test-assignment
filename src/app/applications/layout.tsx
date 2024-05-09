import * as stylex from "@stylexjs/stylex"
import { type ReactNode } from "react"
import ApplicationsCounter from "~/applications/ApplicationCounter"
import SettingsLink from "~/components/SettingsLink"
import ApplicationHeader from "~/ui/ApplicationHeader"

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
      <ApplicationHeader userSection={<ApplicationsCounter />} />
      <main {...stylex.props(styles.main)}>{children}</main>
      <footer>
        <SettingsLink />
      </footer>
      {modal}
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

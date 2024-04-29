"use client"

import * as stylex from "@stylexjs/stylex"
import { type ReactNode } from "react"
import Button from "~/ui/Button"
import Home from "~/ui/icons/Home.svg"
import Logo from "~/ui/icons/Logo.svg"

import { spacing } from "../tokens.stylex"

console.log(Logo)

export default function Header({ userSection }: { userSection?: ReactNode }) {
  return (
    <header {...stylex.props(styles.header)}>
      <Logo aria-label="logoLabelRef" />
      <div {...stylex.props(styles.userSection)}>
        {userSection}
        <Button
          icon={Home}
          size="small"
          intent="action"
          onClick={() => console.log("hey!")}
          label="Home page"
        />
      </div>
    </header>
  )
}

const styles = stylex.create({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: spacing.large,
  },
})

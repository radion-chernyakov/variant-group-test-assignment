"use client"

import * as stylex from "@stylexjs/stylex"
import Link from "next/link"
import { type ReactNode } from "react"
import Button from "~/ui/Button"
import Home from "~/ui/icons/Home.svg"
import Logo from "~/ui/icons/Logo.svg"

import { spacing } from "../tokens.stylex"

export default function Header({ userSection }: { userSection?: ReactNode }) {
  return (
    <header {...stylex.props(styles.header)}>
      <Logo aria-label="logoLabelRef" />
      <div {...stylex.props(styles.userSection)}>
        {userSection}
        <Button
          as={Link}
          href="/applications"
          icon={Home}
          size="small"
          intent="action"
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

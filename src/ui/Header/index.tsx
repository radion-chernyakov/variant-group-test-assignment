"use client"

import * as stylex from "@stylexjs/stylex"
import Link from "next/link"
import { type ReactNode } from "react"
import Button from "~/ui/Button"
import Home from "~/ui/icons/Home.svg"
import Logo from "~/ui/icons/Logo.svg"

import { type MediaQuery, spacing, colors } from "../tokens.stylex"

export default function Header({ userSection }: { userSection?: ReactNode }) {
  return (
    <header {...stylex.props(styles.header)}>
      <Logo aria-label="logoLabelRef" {...stylex.props(styles.logo)} />
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

const mediumMediaQuery: MediaQuery["medium"] = "@media (max-width: 768px)"
const smallMediaQuery: MediaQuery["small"] = "@media (max-width: 480px)"

const styles = stylex.create({
  logo: {
    fill: {
      "@media (prefers-color-scheme: light)": colors.gray900,
      "@media (prefers-color-scheme: dark)": colors.gray50,
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  userSection: {
    containerType: "inline-size",
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
    justifyContent: "flex-end",
    gap: {
      [smallMediaQuery]: spacing.small,
      [mediumMediaQuery]: spacing.medium,
      default: spacing.large,
    },
  },
})

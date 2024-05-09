import * as stylex from "@stylexjs/stylex"

import { colors, paddings, type MediaQuery } from "../ui/tokens.stylex"
import "./globals.css"

export const metadata = {
  title: "Alt + Shift",
  description: "Make sending an application letter as easy as it can be 🚀",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html {...stylex.props(styles.html)} lang="en">
      <body {...stylex.props(styles.body)}>{children}</body>
    </html>
  )
}

const smallMediaQuery: MediaQuery["small"] = "@media (max-width: 480px)"

const styles = stylex.create({
  html: {
    backgroundColor: {
      "@media (prefers-color-scheme: dark)": colors.gray900,
    },
    display: "flex",
    justifyContent: "center",
  },
  body: {
    flexGrow: 1,
    minHeight: "100vh",
    padding: {
      default: paddings.medium,
      [smallMediaQuery]: paddings.xSmall,
    },
    display: "flex",
    maxWidth: `calc(1120px + ${paddings.medium} * 2)`,
  },
})

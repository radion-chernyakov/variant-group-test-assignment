import * as stylex from "@stylexjs/stylex"

import { paddings } from "../ui/tokens.stylex"
import "./globals.css"

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
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

const styles = stylex.create({
  html: {
    display: "flex",
    justifyContent: "center",
  },
  body: {
    flexGrow: 1,
    minHeight: "100vh",
    paddingVertical: paddings.medium,
    paddingHorizontal: paddings.medium,
    display: "flex",
    maxWidth: `calc(1120px + ${paddings.medium} * 2)`,
  },
})

import * as stylex from "@stylexjs/stylex"
import { type ComponentProps } from "react"
import Text from "~/ui/Text"

export default function TextWithTextClamp({
  lines,
  ...props
}: Exclude<ComponentProps<typeof Text>, "style"> & { lines: number }) {
  return <Text style={styles.textClamp(lines)} {...props} />
}

const styles = stylex.create({
  textClamp: (lines: number) => ({
    display: "-webkit-box",
    // eslint-disable-next-line @stylexjs/valid-styles
    "-webkit-line-clamp": lines,
    // eslint-disable-next-line @stylexjs/valid-styles
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  }),
})

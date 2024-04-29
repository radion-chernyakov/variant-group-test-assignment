import * as stylex from "@stylexjs/stylex"
import { type ComponentProps } from "react"
import Text from "~/ui/Text"

export default function TextWithTextClamp(
  props: Exclude<ComponentProps<typeof Text>, "style">,
) {
  return <Text style={styles.textClamp} {...props} />
}

const styles = stylex.create({
  textClamp: {
    display: "-webkit-box",
    // eslint-disable-next-line @stylexjs/valid-styles
    "-webkit-line-clamp": "6",
    // eslint-disable-next-line @stylexjs/valid-styles
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
})

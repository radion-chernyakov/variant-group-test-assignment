import * as RadixSwitch from "@radix-ui/react-switch"
import * as stylex from "@stylexjs/stylex"

import { colors, inputsTokens } from "../tokens.stylex"

export default function Switch({
  id,
  value,
  onChange,
  name,
}: {
  id: string
  value: boolean
  name: string
  onChange: (val: boolean) => void
}) {
  return (
    <RadixSwitch.Root
      {...stylex.props(styles.root, value === true && styles.rootChecked)}
      name={name}
      checked={value}
      onCheckedChange={onChange}
      id={id}
    >
      <RadixSwitch.Thumb
        {...stylex.props(styles.thumb, value === true && styles.thumbChecked)}
      />
    </RadixSwitch.Root>
  )
}

const styles = stylex.create({
  root: {
    width: 42,
    height: 25,
    backgroundColor: {
      default: colors.gray100,
      "@media (prefers-color-scheme: dark)": colors.gray700,
    },
    borderRadius: "9999px",
    position: "relative",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    borderWidth: inputsTokens.borderWidth,
    borderStyle: inputsTokens.borderStyle,
    boxShadow: {
      default: null,
      ":focus-visible": inputsTokens.boxShadow,
    },
    borderColor: {
      default: inputsTokens.borderColor,
      ":focus": inputsTokens.borderColorFocus,
    },
  },
  rootChecked: {
    backgroundColor: {
      default: colors.green400,
      "@media (prefers-color-scheme: dark)": colors.green500,
    },
  },
  thumb: {
    display: "block",
    width: 21,
    height: 21,
    backgroundColor: {
      default: "white",
      "@media (prefers-color-scheme: dark)": colors.gray900,
    },
    borderRadius: "9999px",
    transition: "transform 100ms",
    transform: "translateX(2px)",
    willChange: "transform",
  },
  thumbChecked: {
    transform: "translateX(19px)",
  },
})

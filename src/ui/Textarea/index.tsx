"use client"

import * as stylex from "@stylexjs/stylex"
import { type ComponentProps } from "react"

import { inputsTokens } from "../tokens.stylex"

type Props = Exclude<
  ComponentProps<"textarea">,
  "className" | "style" | "disabled"
>

export default function Textarea(props: Props) {
  return <textarea {...props} {...stylex.props(styles.textarea)} />
}

const styles = stylex.create({
  textarea: {
    flexGrow: 1,
    fontSize: inputsTokens.fontSize,
    lineHeight: inputsTokens.lineHeight,
    color: inputsTokens.color,
    borderRadius: inputsTokens.borderRadius,
    borderWidth: inputsTokens.borderWidth,
    borderColor: inputsTokens.borderColor,
    borderStyle: inputsTokens.borderStyle,
    outline: inputsTokens.outline,
    boxShadow: inputsTokens.boxShadow,
    paddingVertical: "14px",
    paddingHorizontal: "12px",
    resize: "none",
    "::placeholder": {
      color: inputsTokens.placeholderColor,
    },
  },
})

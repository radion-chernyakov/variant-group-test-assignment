"use client"

import * as stylex from "@stylexjs/stylex"
import { type ComponentProps } from "react"

import { inputsTokens } from "../tokens.stylex"

type Props = Exclude<ComponentProps<"input">, "className" | "style">

export default function Input(props: Props) {
  return <input {...props} {...stylex.props(styles.input)} />
}

const styles = stylex.create({
  input: {
    fontSize: inputsTokens.fontSize,
    lineHeight: inputsTokens.lineHeight,
    color: inputsTokens.color,
    borderRadius: inputsTokens.borderRadius,
    borderWidth: inputsTokens.borderWidth,
    borderColor: inputsTokens.borderColor,
    borderStyle: inputsTokens.borderStyle,
    outline: inputsTokens.outline,
    boxShadow: inputsTokens.boxShadow,
    paddingVertical: "8px",
    paddingHorizontal: "12px",
    "::placeholder": {
      color: inputsTokens.placeholderColor,
    },
  },
})

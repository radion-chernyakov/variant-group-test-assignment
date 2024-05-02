"use client"

import * as stylex from "@stylexjs/stylex"
import { useEffect, useRef, type ComponentProps } from "react"

import { inputsTokens } from "../tokens.stylex"

type InputProps = Exclude<
  ComponentProps<"input">,
  "className" | "style" | "disabled" | "value"
>

type CustomProps = {
  errorMessage?: string
}

type Props = InputProps & CustomProps

function ignore(..._args: unknown[]) {
  // ignore
}

export default function Input({
  required,
  minLength,
  maxLength,
  "aria-invalid": ariaValid,
  ...props
}: Props) {
  ignore(required, minLength, maxLength) // ignore them to hide native UI

  return (
    <input
      aria-invalid={ariaValid}
      {...props}
      {...stylex.props(styles.input, ariaValid && styles.invalid)}
    />
  )
}

const styles = stylex.create({
  input: {
    fontSize: inputsTokens.fontSize,
    lineHeight: inputsTokens.lineHeight,
    color: inputsTokens.color,
    borderRadius: inputsTokens.borderRadius,
    borderWidth: inputsTokens.borderWidth,
    borderStyle: inputsTokens.borderStyle,
    outline: inputsTokens.outline,
    borderColor: {
      default: inputsTokens.borderColor,
      ":focus": inputsTokens.borderColorFocus,
    },
    boxShadow: {
      default: "none",
      ":focus": inputsTokens.boxShadow,
    },
    paddingVertical: "8px",
    paddingHorizontal: "12px",
    "::placeholder": {
      color: inputsTokens.placeholderColor,
    },
  },
  invalid: {
    borderColor: inputsTokens.borderColorInvalid,
    boxShadow: {
      default: "none",
      ":focus": inputsTokens.boxShadowInvalid,
    },
  },
})

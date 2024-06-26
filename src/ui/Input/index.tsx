"use client"

import * as stylex from "@stylexjs/stylex"
import { type ComponentProps } from "react"

import { inputsTokens } from "../tokens.stylex"

type TypeProp = Exclude<ComponentProps<"input">["type"], "checkbox" | "radio" | "reset" | "submit">

type InputProps = Exclude<
  ComponentProps<"input">,
  "className" | "style" | "disabled" | "type"
>

type CustomProps = {
  errorMessage?: string
  type: TypeProp
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
    backgroundColor: inputsTokens.backgroundColor,
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

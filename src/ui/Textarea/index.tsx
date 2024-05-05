"use client"

import * as stylex from "@stylexjs/stylex"
import { useEffect, useRef, useState, type ComponentProps } from "react"

import Text from "../Text"
import { inputsTokens, spacing } from "../tokens.stylex"

type Props = Exclude<
  ComponentProps<"textarea">,
  "className" | "style" | "disabled" | "value"
>

export default function Textarea({
  maxLength,
  minLength,
  required: _,
  "aria-invalid": ariaInvalid,
  ...props
}: Props & { value?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [currentLength, setCurrentLength] = useState(props.value?.length ?? 0)
  const [isFocused, setIsFocused] = useState(false)
  const [touchedOnce, setIsTouchedOnce] = useState(false)

  useEffect(() => {
    const textareaNode = textareaRef.current
    if (textareaNode) setCurrentLength(textareaNode.value.length)
  }, [])

  useEffect(() => {
    if (ariaInvalid === true) {
      setIsTouchedOnce(true)
    }
  }, [ariaInvalid])

  const moreThanMaxLength =
    maxLength !== undefined ? maxLength <= currentLength : false
  const lessThanMinLength =
    minLength !== undefined ? minLength >= currentLength : false

  const notInAcceptedRange = moreThanMaxLength || lessThanMinLength
  const isNotAcceptedRangeError = ariaInvalid === true && notInAcceptedRange
  const shouldHighlightSymbolsCount = (() => {
    if (touchedOnce === false) return false

    if (notInAcceptedRange == false) return false
    return true
  })()

  return (
    <div {...stylex.props(styles.container)}>
      <textarea
        aria-invalid={ariaInvalid}
        ref={textareaRef}
        {...props}
        {...stylex.props(styles.textarea, ariaInvalid && styles.invalid)}
        onFocus={(e) => {
          setIsTouchedOnce(true)
          setIsFocused(true)
          props.onFocus && props.onFocus(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          props.onBlur && props.onBlur(e)
        }}
        onChange={(e) => {
          if (maxLength !== undefined) {
            setCurrentLength(e.target.value.length)
          }
          props.onChange && props.onChange(e)
        }}
      />
      {maxLength && (
        <Text
          id={isNotAcceptedRangeError ? props["aria-errormessage"] : undefined}
          colorVariant="light"
          size="xSmall"
          colorScheme={shouldHighlightSymbolsCount ? "danger" : "default"}
        >{`${currentLength}/${maxLength}`}</Text>
      )}
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xSmall,
  },
  textarea: {
    backgroundColor: inputsTokens.backgroundColor,
    flexGrow: 1,
    fontSize: inputsTokens.fontSize,
    lineHeight: inputsTokens.lineHeight,
    color: inputsTokens.color,
    borderRadius: inputsTokens.borderRadius,
    borderWidth: inputsTokens.borderWidth,
    borderColor: {
      default: inputsTokens.borderColor,
      ":focus": inputsTokens.borderColorFocus,
    },
    borderStyle: inputsTokens.borderStyle,
    outline: inputsTokens.outline,
    boxShadow: {
      default: "none",
      ":focus": inputsTokens.boxShadow,
    },
    paddingVertical: "14px",
    paddingHorizontal: "12px",
    resize: "none",
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

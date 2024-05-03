"use client"

import * as stylex from "@stylexjs/stylex"
import { type StyleXStyles } from "@stylexjs/stylex/lib/StyleXTypes"
import type Link from "next/link"
import {
  type ComponentProps,
  type ComponentType,
  type ReactNode,
  type SVGProps,
  type MouseEventHandler,
  useId,
} from "react"
import Text, { type Size as TextSize } from "~/ui/Text"
import Loading from "~/ui/icons/Loading.svg"

import { borderRadius, colors } from "../tokens.stylex"
import { baseButtonTokens, buttonSize, buttonIntent } from "./tokens.stylex"

type Size = "small" | "medium"

type Intent = "submit" | "action" | "functional"

type IconPosition = "block-start" | "block-end"

type ChildrenProps =
  | {
      icon: ComponentType<Pick<SVGProps<SVGElement>, "height" | "width">>
      iconPosition: IconPosition
      children: ReactNode
      label?: undefined
    }
  | {
      icon: ComponentType<Pick<SVGProps<SVGElement>, "height" | "width">>
      iconPosition?: undefined
      children?: undefined
      label: string
    }
  | {
      icon?: undefined
      iconPosition?: undefined
      children: ReactNode
      label?: undefined
    }

type AlignSelf = "flex-start" | "flex-end" | "center"

// type ActionProps =
//   | {
//       as: typeof Link
//       href: string
//     }
//   | {
//       as?: "button"
//       href?: undefined
//     }

type ActionProps =
  | {
      as: typeof Link
      href?: string
      onClick?: MouseEventHandler<ComponentProps<typeof Link>>
    }
  | {
      as?: "button"
      href?: undefined
      onClick?: MouseEventHandler<HTMLButtonElement>
    }

type Props = {
  grow?: boolean
  alignSelf?: AlignSelf
  size: Size
  intent: Intent
  loading?: boolean
} & ChildrenProps &
  ActionProps &
  Pick<ComponentProps<"button">, "type" | "disabled">

// TODO: avoid disabling buttons inside forms (using either context or selectors) to improve UX
// see https://adrianroselli.com/2024/02/dont-disable-form-controls.html

type NotNullable<T> = Exclude<T, null | undefined>

export default function Button({
  children,
  size,
  intent,
  icon: Icon,
  iconPosition,
  onClick: rawOnClick,
  as: As = "button",
  label: labeledBy,
  alignSelf,
  grow,
  loading,
  type: rawType,
  ...restButtonProps
}: Props) {
  const labeledById = useId()
  const iconSize = iconSizeMap[size]
  const sizeTheme = sizeThemes[size]
  const intentTheme = intentThemes[intent]

  const iconPositionStyles = iconPosition
    ? iconPositionMap[iconPosition]
    : undefined

  const onClick = (e: Parameters<NotNullable<typeof rawOnClick>>[0]) => {
    if (loading) return
    rawOnClick?.(e)
  }

  const type = loading ? "button" : rawType

  return (
    <As
      aria-labelledby={!children ? labeledById : undefined}
      onClick={onClick}
      type={type}
      {...restButtonProps}
      {...stylex.props(
        sizeTheme,
        intentTheme,
        buttonStyles.base,
        !children && buttonStyles.iconOnly,
        intent === "functional" && buttonStyles.functionalIntent,
        alignSelf && alignMap[alignSelf],
        grow && buttonStyles.grow,
        loading && buttonStyles.loading,
        iconPositionStyles,
      )}
    >
      {!children && (
        <span id={labeledById} hidden>
          {labeledBy}
        </span>
      )}
      {loading && (
        <div {...stylex.props(buttonStyles.loadingSpinner)}>
          <Loading />
        </div>
      )}
      {Icon && <Icon width={iconSize} height={iconSize} />}
      {children && (
        <Text
          colorScheme="inherit"
          weight="semibold"
          style={[
            textPositionAdjustmentMap[size],
            loading && buttonStyles.textLoading,
          ]}
          size={textSizeMap[size]}
        >
          {children}
        </Text>
      )}
    </As>
  )
}

const iconSizeMap: Record<Size, number> = {
  small: 20,
  medium: 24,
}

const textSizeMap: Record<Size, TextSize> = {
  small: "small",
  medium: "medium",
}

const rotateAnimation = stylex.keyframes({
  from: {
    rotate: "0deg",
  },
  // "50%": {
  //   rotate: "180deg",
  // },
  to: {
    rotate: "180deg",
  },
})

const buttonStyles = stylex.create({
  base: {
    outline: "none",
    textDecoration: "none",
    position: "relative",
    borderRadius: borderRadius.control,
    cursor: { default: "pointer", ":disabled": "default" },
    flexDirection: "row",
    borderWidth: baseButtonTokens.borderWidth,
    paddingVertical: `calc(${buttonSize.paddingVertical} - ${baseButtonTokens.borderWidth})`,
    paddingHorizontal: `calc(${buttonSize.paddingHorizontal} - ${baseButtonTokens.borderWidth})`,
    gap: buttonSize.gap,
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: {
      default: "none",
      ":focus-visible": `0px 0px 0px 4px ${buttonIntent.focusRing}`,
    },
    color: {
      default: buttonIntent.color,
      ":hover:not(:disabled)": buttonIntent.colorHover,
      ":disabled": buttonIntent.colorDisabled,
    },
    borderColor: {
      default: buttonIntent.borderColor,
      ":hover:not(:disabled)": buttonIntent.borderColorHover,
      ":disabled": buttonIntent.borderColorDisabled,
    },
    backgroundColor: {
      default: buttonIntent.backgroundColor,
      ":hover:not(:disabled)": buttonIntent.backgroundColorHover,
      ":disabled": buttonIntent.backgroundColorDisabled,
    },
  },
  loading: {
    cursor: "default",
  },
  textLoading: {
    opacity: 0,
  },
  loadingSpinner: {
    position: "absolute",
    display: "flex",
    animationName: rotateAnimation,
    animationDuration: "0.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  alignSelfFlexStart: {
    alignSelf: "flex-start",
  },
  alignSelfFlexEnd: {
    alignSelf: "flex-end",
  },
  alignSelfFlexCenter: {
    alignSelf: "center",
  },
  functionalIntent: {
    padding: "10px",
    margin: "-10px",
    borderWidth: "0px",
  },
  iconOnly: {
    paddingHorizontal: `calc(${buttonSize.paddingVertical} - ${baseButtonTokens.borderWidth})`,
  },
  iconBlockEnd: {
    flexDirection: "row-reverse",
  },
  smallTextContainer: {
    translate: "0 1.7px",
  },
  mediumTextContainer: {
    translate: "0 2px",
  },
  grow: {
    flexGrow: 1,
  },
})

const alignMap: Record<AlignSelf, StyleXStyles> = {
  "flex-end": buttonStyles.alignSelfFlexEnd,
  "flex-start": buttonStyles.alignSelfFlexStart,
  center: buttonStyles.alignSelfFlexCenter,
}

const textPositionAdjustmentMap: Record<Size, StyleXStyles> = {
  small: buttonStyles.mediumTextContainer,
  medium: buttonStyles.smallTextContainer,
}

const smallSizeTheme = stylex.createTheme(buttonSize, {
  paddingVertical: "10px",
  paddingHorizontal: "18px",
})

const sizeThemes = {
  medium: undefined,
  small: smallSizeTheme,
}

const actionIntentTheme = stylex.createTheme(buttonIntent, {
  focusRing: colors.gray100,
  color: colors.gray800,
  colorDisabled: colors.gray300,
  colorHover: colors.gray700,
  borderColor: colors.gray100,
  borderColorDisabled: colors.gray300,
  borderColorHover: colors.gray200,
  backgroundColor: "transparent",
  backgroundColorDisabled: "transparent",
  backgroundColorHover: "transparent",
})

const functionalIntentTheme = stylex.createTheme(buttonIntent, {
  focusRing: colors.gray100,
  color: colors.gray500,
  colorDisabled: colors.gray300,
  colorHover: colors.gray400,
  borderColor: "transparent",
  borderColorDisabled: "transparent",
  borderColorHover: "transparent",
  backgroundColor: "transparent",
  backgroundColorDisabled: "transparent",
  backgroundColorHover: "transparent",
})

const intentThemes = {
  submit: undefined,
  action: actionIntentTheme,
  functional: functionalIntentTheme,
}

const iconPositionMap: Record<IconPosition, StyleXStyles | undefined> = {
  "block-start": undefined,
  "block-end": buttonStyles.iconBlockEnd,
}

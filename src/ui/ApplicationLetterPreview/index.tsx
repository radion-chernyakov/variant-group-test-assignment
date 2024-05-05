"use client"

import * as stylex from "@stylexjs/stylex"
import { Fragment, type Ref, useId, forwardRef } from "react"
import { type Application } from "~/applications/store"
import Text from "~/ui/Text"
import Copy from "~/ui/icons/Copy.svg"
import { type Result } from "~/utils/result"

import Button from "../Button"
import CopyToClipboardButton from "../CopyToClipboardButton"
import {
  backgroundColors,
  borderRadius,
  colors,
  paddings,
  spacing,
} from "../tokens.stylex"
import { animationTokens } from "./tokens.stylex"

type ApplicationResult = Result<Application>

function ApplicationLetterPreview(
  {
    applicationResult,
  }: {
    applicationResult: ApplicationResult | null
  },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div ref={ref} {...stylex.props(styles.container)}>
      {!applicationResult && (
        <Text size="medium" colorVariant="light" weight="normal">
          Your personalized job application will appear here...
        </Text>
      )}
      {applicationResult?.loading && (
        <div {...stylex.props(styles.loadingContainer)}>
          <Generating />
        </div>
      )}
      {applicationResult?.data && (
        <>
          <div {...stylex.props(styles.textContainer)}>
            {applicationResult.data.letter
              .split("\n")
              .map((paragraph, index) => (
                <Fragment key={index}>
                  <Text size="medium" colorVariant="light" weight="normal">
                    {paragraph}
                  </Text>
                  <br />
                </Fragment>
              ))}
          </div>
          <div {...stylex.props(styles.buttonsContainer)}>
            <CopyToClipboardButton
              size="small"
              intent="functional"
              iconPosition="block-end"
              text={applicationResult.data.letter}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default forwardRef(ApplicationLetterPreview)

const styles = stylex.create({
  container: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    padding: paddings.small,
    gap: spacing.small,
    borderRadius: borderRadius.section,
    backgroundColor: backgroundColors.gray,
    justifyContent: "space-between",
  },
  textContainer: {
    overflowY: "scroll",
    paddingRight: paddings.xxSmall, // to add space for scroll bar
    marginRight: `calc(-1 * ${paddings.xxSmall})`,
  },
  loadingContainer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    paddingTop: paddings.xxSmall, // to add space for background gradient
    marginTop: `calc(-1 * ${paddings.xxSmall})`,
    background: `linear-gradient(180deg, transparent 0%, ${backgroundColors.gray} 70%)`,
    position: "sticky",
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
})

function Generating() {
  const id = useId()
  return (
    <div
      {...stylex.props(generatingCircleStyles.container)}
      role="progressbar"
      aria-labelledby={id}
    >
      <span id={id} hidden>
        Generating application in progress
      </span>
      <div {...stylex.props(generatingCircleStyles.circle)} />
    </div>
  )
}

const circleAnimation = stylex.keyframes({
  from: {
    [animationTokens.top]: "-50%",
    [animationTokens.opacity]: "0.48",
  },
  "50%": {
    [animationTokens.top]: "50%",
    [animationTokens.opacity]: "1",
  },
  to: {
    [animationTokens.top]: "150%",
    [animationTokens.opacity]: "0.48",
  },
})

const generatingCircleStyles = stylex.create({
  container: {
    height: 160,
    width: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderRadius: "50%",
    height: 80,
    width: 80,
    animationName: circleAnimation,
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "cubic-bezier(0.2, 0, 1, 0.8)",
    opacity: animationTokens.opacity,
    // TODO: use tokens instead of hardcoded colors
    background: {
      default: `radial-gradient(
        60.16% 60.16% at ${animationTokens.top} 21.88%,
        #FFFFFF 0%,
        rgba(255, 255, 255, 0.16) 100%
      ),
      radial-gradient(
        100% 100% at 0% 0%,
        #FFFFFF 0%,
        ${colors.gray100} 100%
      )`,
      "@media (prefers-color-scheme: dark)": `radial-gradient(
        60.16% 60.16% at ${animationTokens.top} 21.88%,
        ${colors.gray700} 0%,
        rgba(0, 0, 0, 0.16) 100%
      ),
      radial-gradient(
        100% 100% at 0% 0%,
        ${colors.gray900} 0%,
        ${colors.gray800} 100%
      )`,
    },
    boxShadow: {
      default: `inset 0px -2px 32px rgb(from ${colors.gray900} r g b / .08)`,
      "@media (prefers-color-scheme: dark)": `inset 0px -2px 32px rgb(from ${colors.gray50} r g b / .08)`,
    },
  },
})

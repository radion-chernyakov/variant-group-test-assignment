"use client"

import * as stylex from "@stylexjs/stylex"
import { Fragment, useId } from "react"
import Text from "~/ui/Text"

import Button from "../Button"
import { borderRadius, colors, spacing } from "../tokens.stylex"
import { animationTokens } from "./tokens.stylex"

type ApplicationPreview =
  | {
      letter: string
      generating: false
    }
  | {
      letter?: undefined
      generating: true
    }

export default function ApplicationLetterPreview({
  preview,
}: {
  preview: ApplicationPreview | null
}) {
  return (
    <div {...stylex.props(styles.container)}>
      {!preview && (
        <Text size="medium" colorVariant="light" weight="normal">
          Your personalized job application will appear here...
        </Text>
      )}
      {preview?.generating && (
        <div {...stylex.props(styles.loadingContainer)}>
          <Generating />
        </div>
      )}
      {preview?.letter && (
        <>
          <div {...stylex.props(styles.textContainer)}>
            {preview.letter.split("\n").map((paragraph, index) => (
              <Fragment key={index}>
                <Text size="medium" colorVariant="light" weight="normal">
                  {paragraph}
                </Text>
                <br />
              </Fragment>
            ))}
          </div>
          <div {...stylex.props(styles.buttonsContainer)}>
            <Button
              size="small"
              intent="functional"
              onClick={() => console.log("")}
            >
              Copy to clipboard
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const styles = stylex.create({
  container: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    padding: 24,
    gap: spacing.small,
    borderRadius: borderRadius.section,
    backgroundColor: colors.gray50,
    justifyContent: "space-between",
  },
  textContainer: {
    paddingRight: "12px",
    marginRight: "-12px",
  },
  loadingContainer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    paddingTop: "12px",
    marginTop: "-12px",
    // TODO: calculate ^ 12 px and 60% somehow to make it scalable
    background: `linear-gradient(180deg, transparent 0%, ${colors.gray50} 60%)`,
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
    background: `radial-gradient(
      60.16% 60.16% at ${animationTokens.top} 21.88%,
      #FFFFFF 0%,
      rgba(255, 255, 255, 0.16) 100%
    ),
    radial-gradient(
      100% 100% at 0% 0%,
      #FFFFFF 0%,
      #D0D5DD 100%
    )`,
    boxShadow: "inset 0px -2px 32px rgba(16, 24, 40, 0.08)",
  },
})

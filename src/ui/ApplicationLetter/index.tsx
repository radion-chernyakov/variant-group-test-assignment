"use client"

import * as stylex from "@stylexjs/stylex"
import { Fragment } from "react"
import Button from "~/ui/Button"
import { type Size as TextSize, getLineHeight } from "~/ui/Text"
import TextWithTextClamp from "~/ui/TextWithTextClamp"

import { borderRadius, colors, spacing } from "../tokens.stylex"

type Application = {
  id: string
  company: string
  position: string
  skills: string
  details: string
  letter: string
}

export default function ApplicationLetter({
  application,
  textSize = "medium",
}: {
  application: Application
  textSize: TextSize
}) {
  return (
    <section {...stylex.props(styles.container)}>
      <h2
        hidden
      >{`Application on ${application.position} position at ${application.company}`}</h2>
      <div {...stylex.props(styles.textWrapper)}>
        <TextWithTextClamp colorVariant="light" size={textSize} weight="normal">
          {application.letter.split("\n").map((paragraph, index) => (
            <Fragment key={index}>
              <div key={index}>{paragraph}</div>
              <br />
            </Fragment>
          ))}
        </TextWithTextClamp>
        <div {...stylex.props(styles.textGradientOverlay(textSize))} />
      </div>
      <div {...stylex.props(styles.buttonSection)}>
        <Button
          alignSelf="flex-start"
          intent="functional"
          size="small"
          onClick={() => console.log("delete")}
        >
          Delete
        </Button>
        <Button
          alignSelf="flex-end"
          intent="functional"
          size="small"
          onClick={() => console.log("copy")}
        >
          Copy to clipboard
        </Button>
      </div>
    </section>
  )
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.control,
    padding: "24px",
    gap: spacing.normal,
  },
  buttonSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  textWrapper: {
    position: "relative",
  },
  textGradientOverlay: (textSize: TextSize) => ({
    position: "absolute",
    bottom: 0,
    height: 1.43 * getLineHeight(textSize),
    pointerEvents: "none",
    width: "100%",
    background: `linear-gradient(180deg, transparent 0%, ${colors.gray50} 100%)`,
  }),
})

"use client"

import * as stylex from "@stylexjs/stylex"
import { Fragment, type MouseEventHandler } from "react"
import type { Application } from "~/applications/store"
import Button from "~/ui/Button"
import { type Size as TextSize, getLineHeight } from "~/ui/Text"
import TextWithTextClamp from "~/ui/TextWithTextClamp"
import Copy from "~/ui/icons/Copy.svg"
import Trash from "~/ui/icons/Trash.svg"

import {
  backgroundColors,
  borderRadius,
  colors,
  paddings,
  spacing,
} from "../tokens.stylex"

export default function Application({
  application,
  textSize = "medium",
  onDelete,
  onCopy,
}: {
  onDelete: MouseEventHandler<HTMLButtonElement>
  onCopy: MouseEventHandler<HTMLButtonElement>
  application: Application
  textSize?: TextSize
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
              <span key={index}>{paragraph}</span>
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
          icon={Trash}
          iconPosition="block-start"
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          alignSelf="flex-end"
          intent="functional"
          size="small"
          onClick={onCopy}
          icon={Copy}
          iconPosition="block-end"
        >
          Copy to clipboard
        </Button>
      </div>
    </section>
  )
}

const styles = stylex.create({
  container: {
    height: "max-content",
    display: "flex",
    flexDirection: "column",
    backgroundColor: backgroundColors.gray,
    borderRadius: borderRadius.control,
    padding: paddings.small,
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
    background: `linear-gradient(180deg, transparent 0%, ${backgroundColors.gray} 100%)`,
  }),
})

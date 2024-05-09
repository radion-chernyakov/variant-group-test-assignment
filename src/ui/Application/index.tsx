"use client"

import * as stylex from "@stylexjs/stylex"
import Link from "next/link"
import {
  type ComponentProps,
  Fragment,
  useRef,
  useState,
  type MouseEventHandler,
} from "react"
import type { Application } from "~/applications/store"
import Button from "~/ui/Button"
import { type Size as TextSize, getLineHeight } from "~/ui/Text"
import TextWithTextClamp from "~/ui/TextWithTextClamp"
import Trash from "~/ui/icons/Trash.svg"

import CopyToClipboardButton from "../CopyToClipboardButton"
import VisuallyHidden from "../VisuallyHidden"
import {
  backgroundColors,
  borderRadius,
  colors,
  paddings,
  spacing,
  type ExtractPXVarValue,
} from "../tokens.stylex"

const defaultTextSize = "medium"
const defaultLinesCount = 6

export default function Application({
  application,
  textSize = defaultTextSize,
  linesCount = defaultLinesCount,
  onDelete,
}: {
  linesCount?: number
  onDelete: MouseEventHandler<HTMLButtonElement>
  application: Application
  textSize?: TextSize
}) {
  const [hiddenLinkFocused, setHiddenLinkFocused] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)
  return (
    <section
      {...stylex.props(
        styles.container,
        hiddenLinkFocused && styles.containerWithLinkFocused,
      )}
      onClick={(e) => {
        // @ts-expect-error actually nodes has `.closest` method
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (e.target.closest("button") || e.target.closest("a")) return
        if (linkRef.current) {
          linkRef.current.click()
        }
      }}
    >
      <h2
        hidden
      >{`Application on ${application.position} position at ${application.company}`}</h2>
      <VisuallyHidden>
        <Link
          onFocus={() => setHiddenLinkFocused(true)}
          onBlur={() => setHiddenLinkFocused(false)}
          ref={linkRef}
          href={`/applications/${application.id}`}
        >
          {`Application on ${application.position} position at ${application.company}`}
        </Link>
      </VisuallyHidden>
      <div {...stylex.props(styles.textWrapper)}>
        <TextWithTextClamp
          lines={linesCount}
          colorVariant="light"
          size={textSize}
          weight="normal"
        >
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
        <CopyToClipboardButton
          alignSelf="flex-end"
          intent="functional"
          size="small"
          iconPosition="block-end"
          text={application.letter}
        />
      </div>
    </section>
  )
}

const padding = paddings.small
const gap = spacing.normal

export const calculateHeight = (textSize: TextSize, linesCount: number) => {
  const paddingSizeInPX: ExtractPXVarValue<typeof padding> = 24
  const textSizeInPX = getLineHeight(textSize) * linesCount
  const gapSizeInPX: ExtractPXVarValue<typeof gap> = 16

  // Well, I'll leave it hardcoded, it's not likely it gonna change and it's easier to write a test that will make sure that such a hardcoded value is correct
  //  for functional button rather than write a function that will actually calculate it
  const buttonSize = 20

  return paddingSizeInPX * 2 + textSizeInPX + gapSizeInPX + buttonSize
}

export function ApplicationSkeleton({
  linesCount = defaultLinesCount,
  textSize = defaultTextSize,
}: Pick<ComponentProps<typeof Application>, "linesCount" | "textSize">) {
  const height = calculateHeight(textSize, linesCount)
  return (
    <div {...stylex.props(styles.container, styles.skeleton(height))}></div>
  )
}

const styles = stylex.create({
  container: {
    cursor: "pointer",
    height: "max-content",
    display: "flex",
    flexDirection: "column",
    backgroundColor: backgroundColors.gray,
    borderRadius: borderRadius.control,
    padding,
    gap,
    boxShadow: {
      default: "none",
      ":hover:not(:focus-within)": `0px 0px 0px 2px ${backgroundColors.gray}`,
    },
  },
  skeleton: (height: number) => ({
    height,
  }),
  containerWithLinkFocused: {
    boxShadow: `0px 0px 0px 2px ${colors.green400}`,
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

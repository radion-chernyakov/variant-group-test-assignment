import * as stylex from "@stylexjs/stylex"
import Text from "~/ui/Text"
import CheckIcon from "~/ui/icons/Check.svg"

import { colors } from "../tokens.stylex"

const maxProgress = 5

type ProgressStyle = "rounded" | "dots"
type TextStyle = "short" | "full"
type Layout = "vertical" | "horizontal"

export default function ProgressBar({
  progress,
  progressStyle,
  textStyle,
  layout,
}: {
  progress: number
  progressStyle: ProgressStyle
  textStyle: TextStyle
  layout: Layout
}) {
  const effectiveMaxProgress = progress < maxProgress ? maxProgress : progress

  const compactText = `${progress} out of ${effectiveMaxProgress}`

  const fullProgressText =
    progress > maxProgress
      ? `${progress}/${effectiveMaxProgress} applications generated`
      : `${progress}/5 applications generated`

  const displayTextMap: Record<TextStyle, string> = {
    short: compactText,
    full: fullProgressText,
  }

  const displayText = displayTextMap[textStyle]

  return (
    <div
      {...stylex.props(styles.container, layoutMap[layout])}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={effectiveMaxProgress}
      aria-valuenow={progress}
      aria-valuetext={fullProgressText}
    >
      <div {...stylex.props(styles.progressItemsContainer)}>
        {progress < maxProgress ? (
          getProgressVisualizationData(progress).map(({ completed, key }) => (
            <div
              key={key}
              {...stylex.props(
                styles.progressItem,
                progressItemStyleMap[progressStyle],
                completed && styles.progressItemCompleted,
              )}
            />
          ))
        ) : (
          <CheckIcon />
        )}
      </div>
      <Text style={styles.text} weight="light" size="medium">
        {displayText}
      </Text>
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: "flex",
    width: "max-content",
  },
  containerVertical: {
    gap: 8,
    flexDirection: "column",
  },
  containerHorizontal: {
    gap: 16,
    flexDirection: "row-reverse",
  },
  text: {
    color: colors.gray400,
    textAlign: "center",
  },
  progressItemsContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    gap: 8,
  },
  progressItemRounded: {
    width: "32px",
  },
  progressItemDot: {
    width: "8px",
  },
  progressItem: {
    borderRadius: "4px",
    height: "8px",
    backgroundColor: colors.gray25,
  },
  progressItemCompleted: {
    backgroundColor: colors.gray900,
  },
})

const progressItemStyleMap: Record<ProgressStyle, stylex.StyleXStyles> = {
  rounded: styles.progressItemRounded,
  dots: styles.progressItemDot,
}

const layoutMap: Record<Layout, stylex.StaticStyles> = {
  horizontal: styles.containerHorizontal,
  vertical: styles.containerVertical,
}

const getProgressVisualizationData = (progress: number) =>
  Array.from(Array(maxProgress)).map((_, index) => ({
    completed: index < progress,
    key: index,
  }))

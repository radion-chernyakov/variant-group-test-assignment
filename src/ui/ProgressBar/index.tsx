import * as stylex from "@stylexjs/stylex"
import Text from "~/ui/Text"
import CheckIcon from "~/ui/icons/Check.svg"

import { type ContainerQuery, colors, spacing } from "../tokens.stylex"

const maxProgress = 5

type ProgressStyle = "rounded" | "dots"
type TextStyle = "short" | "full"
type Layout = "vertical" | "horizontal"

export default function ProgressBar({
  progress,
  progressStyle,
  preferTextStyle = "full",
  layout,
}: {
  progress: number
  progressStyle: ProgressStyle
  preferTextStyle?: TextStyle
  layout: Layout
}) {
  const effectiveMaxProgress = progress < maxProgress ? maxProgress : progress

  const shortText = `${progress} out of ${effectiveMaxProgress}`

  const fullText =
    progress > maxProgress
      ? `${progress}/${effectiveMaxProgress} applications generated`
      : `${progress}/5 applications generated`

  return (
    <div
      {...stylex.props(styles.container, layoutMap[layout])}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={effectiveMaxProgress}
      aria-valuenow={progress}
      aria-valuetext={fullText}
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
      <Text
        colorVariant="light"
        textAlign="center"
        weight="light"
        size="medium"
        style={preferTextStyle === "full" ? styles.compactText : null}
      >
        {shortText}
      </Text>
      {preferTextStyle === "full" && (
        <Text
          colorVariant="light"
          textAlign="center"
          weight="light"
          size="medium"
          style={styles.fullText}
        >
          {fullText}
        </Text>
      )}
    </div>
  )
}

const xSmallContainerQuery: ContainerQuery["xSmall"] =
  "@container (max-width: 320px)"

const smallContainerQuery: ContainerQuery["small"] =
  "@container (max-width: 480px)"

const styles = stylex.create({
  container: {
    display: "flex",
    width: "max-content",
  },
  containerVertical: {
    gap: spacing.small,
    flexDirection: "column",
  },
  containerHorizontal: {
    gap: spacing.normal,
    flexDirection: "row-reverse",
  },
  progressItemsContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    gap: {
      default: spacing.small,
      [xSmallContainerQuery]: spacing.xSmall,
    },
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
  compactText: {
    display: {
      default: "none",
      [xSmallContainerQuery]: "none",
      [smallContainerQuery]: "block",
    },
  },
  fullText: {
    display: {
      default: null,
      [smallContainerQuery]: "none",
    },
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

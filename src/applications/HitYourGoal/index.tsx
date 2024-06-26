"use client"

import * as stylex from "@stylexjs/stylex"
import Link from "next/link"
import ProgressBar from "~/applications/ProgressBar"
import Button from "~/ui/Button"
import Text from "~/ui/Text"
import PlusIcon from "~/ui/icons/Plus.svg"
import { mapResult } from "~/utils/result"

import {
  type MediaQuery,
  borderRadius,
  spacing,
  paddings,
  backgroundColors,
} from "../../ui/tokens.stylex"
import { useApplicationsCount } from "../store"

export default function HitYourGoal() {
  const applicationsCount = useApplicationsCount()

  return mapResult(applicationsCount, {
    onError: () => null,
    onLoading: () => null,
    onData: (applicationsCount) => {
      if (applicationsCount >= 5) return null
      return (
        <section {...stylex.props(styles.container)}>
          <div {...stylex.props(styles.innerContainer)}>
            <div {...stylex.props(styles.topSection)}>
              <Text as="h2" size="large" weight="semibold" textAlign="center">
                Hit your goal
              </Text>
              <Text
                colorVariant="light"
                size="medium"
                weight="light"
                textAlign="center"
              >
                Generate and send out couple more job applications today to get
                hired faster
              </Text>
              <Button
                as={Link}
                href="/applications/new"
                alignSelf="center"
                size="medium"
                intent="submit"
                icon={PlusIcon}
                iconPosition="block-start"
              >
                Create New
              </Button>
            </div>
            <ProgressBar
              preferTextStyle="short"
              progress={applicationsCount}
              progressStyle="rounded"
              layout="vertical"
            />
          </div>
        </section>
      )
    },
  })
}

const smallMediaQuery: MediaQuery["small"] = "@media (max-width: 480px)"

const styles = stylex.create({
  container: {
    height: "max-content",
    display: "flex",
    justifyContent: "center",
    paddingVertical: {
      default: paddings.large,
      [smallMediaQuery]: paddings.small,
    },
    paddingHorizontal: {
      default: paddings.xLarge,
      [smallMediaQuery]: paddings.medium,
    },
    borderRadius: borderRadius.section,
    backgroundColor: backgroundColors.green,
  },
  innerContainer: {
    alignItems: "center",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    gap: spacing.xLarge,
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.normal,
  },
})

"use client"

import * as stylex from "@stylexjs/stylex"
import Link from "next/link"
import Button from "~/ui/Button"
import ProgressBar from "~/ui/ProgressBar"
import Text from "~/ui/Text"

import { borderRadius, colors, spacing } from "../../ui/tokens.stylex"
import { useApplications } from "../store"

export default function HitYourGoal() {
  const applications = useApplications()
  if (!applications) return null
  const progress = applications.length
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
          >
            Create New
          </Button>
        </div>
        <ProgressBar
          textStyle="full"
          progress={progress}
          progressStyle="rounded"
          layout="vertical"
        />
      </div>
    </section>
  )
}

const styles = stylex.create({
  container: {
    height: "max-content",
    display: "flex",
    justifyContent: "center",
    paddingVertical: 54,
    paddingHorizontal: 64,
    borderRadius: borderRadius.section,
    backgroundColor: colors.green50,
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

"use client"

import stylex from "@stylexjs/stylex"
import Link from "next/link"
import ApplicationsList from "~/applications/ApplicationsList"
import HitYourGoal from "~/applications/HitYourGoal"
import Button from "~/ui/Button"
import PageHeader from "~/ui/PageHeader"
import PlusIcon from "~/ui/icons/Plus.svg"

import { spacing } from "../../ui/tokens.stylex"

export default function ApplicationsPage() {
  return (
    <div {...stylex.props(styles.container)}>
      <PageHeader
        controls={
          <Button
            href="/applications/new"
            as={Link}
            size="small"
            intent="submit"
            icon={PlusIcon}
            iconPosition="block-start"
          >
            Create New
          </Button>
        }
      >
        Applications
      </PageHeader>
      <ApplicationsList />
      <HitYourGoal />
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxLarge,
    width: "100%",
  },
})

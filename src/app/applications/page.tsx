"use client"

import stylex from "@stylexjs/stylex"
import Link from "next/link"
import { Suspense } from "react"
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
      <Suspense>
        <ApplicationsList />
      </Suspense>
      <Suspense>
        <HitYourGoal />
      </Suspense>
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: "grid",
    height: "max-content",
    gap: spacing.xxLarge,
    width: "100%",
  },
})

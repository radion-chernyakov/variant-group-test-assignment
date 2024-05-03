import stylex from "@stylexjs/stylex"
import { Suspense } from "react"
import ApplicationsList from "~/applications/ApplicationsList"
import HitYourGoal from "~/applications/HitYourGoal"

import { spacing } from "../../ui/tokens.stylex"

export default function ApplicationsPage() {
  return (
    <div {...stylex.props(styles.container)}>
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
    gap: spacing.xLarge,
    width: "100%",
  },
})

import stylex from "@stylexjs/stylex"
import { Suspense } from "react"
import ApplicationsList from "~/applications/ApplicationsList"
import HitYourGoal from "~/applications/HitYourGoal"

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
    gap: "32px",
    width: "100%",
  },
})

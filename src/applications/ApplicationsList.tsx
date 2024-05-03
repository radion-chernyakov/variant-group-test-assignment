"use client"

import stylex from "@stylexjs/stylex"
import Application from "~/ui/Application"

import { spacing, type Query } from "../ui/tokens.stylex"
import { removeApplicationsById, useApplications } from "./store"

export default function ApplicationsList() {
  const applications = useApplications()
  if (!applications || applications.length === 0) return null
  return (
    <div {...stylex.props(styles.container)}>
      {applications?.map((application) => (
        <Application
          onCopy={() => console.log("kek")}
          onDelete={() => removeApplicationsById(application.id)}
          key={application.id}
          application={application}
        />
      ))}
    </div>
  )
}

const mediumQuery: Query["medium"] = "@media (max-width: 768px)"
const xLargeQuery: Query["xLarge"] = "@media (max-width: 1200px)"

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr 1fr 1fr",
      [mediumQuery]: "1fr",
      [xLargeQuery]: "1fr 1fr",
    },
    gap: spacing.small,
  },
})

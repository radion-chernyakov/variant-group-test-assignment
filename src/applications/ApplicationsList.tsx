"use client"

import stylex from "@stylexjs/stylex"
import { useDeferredValue } from "react"
import Application from "~/ui/Application"

import { spacing, type MediaQuery } from "../ui/tokens.stylex"
import { removeApplicationsById, useApplications } from "./store"

export default function ApplicationsList() {
  const applications = useApplications()
  const deferredApplications = useDeferredValue(applications)
  if (!applications || applications.length === 0) return null
  return (
    <div {...stylex.props(styles.container)}>
      {deferredApplications?.map((application) => (
        <Application
          onDelete={() => removeApplicationsById(application.id)}
          key={application.id}
          application={application}
        />
      ))}
    </div>
  )
}

const mediumQuery: MediaQuery["medium"] = "@media (max-width: 768px)"

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr 1fr",
      [mediumQuery]: "1fr",
    },
    gap: spacing.small,
  },
})

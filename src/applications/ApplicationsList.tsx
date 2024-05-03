"use client"

import stylex from "@stylexjs/stylex"
import Application from "~/ui/Application"

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

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
})

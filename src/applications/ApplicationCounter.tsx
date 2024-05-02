"use client"

import { useApplications } from "~/applications/store"
import ProgressBar from "~/ui/ProgressBar"

export default function ApplicationsCounter() {
  const applications = useApplications()
  if (!applications) return null
  const applicationsCount = applications.length

  return (
    <ProgressBar
      progress={applicationsCount}
      progressStyle="dots"
      textStyle="full"
      layout="horizontal"
    />
  )
}

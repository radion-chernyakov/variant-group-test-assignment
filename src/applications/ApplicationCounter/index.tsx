"use client"

import ProgressBar from "~/applications/ProgressBar"
import { useApplicationsCount } from "~/applications/store"
import { mapResult } from "~/utils/result"

export default function ApplicationsCounter() {
  const applicationsCountResult = useApplicationsCount()

  return mapResult(applicationsCountResult, {
    onError: () => null,
    onLoading: () => null,
    onData: (applicationsCount) => {
      return (
        <ProgressBar
          progress={applicationsCount}
          progressStyle="dots"
          preferTextStyle="full"
          layout="horizontal"
        />
      )
    },
  })
}

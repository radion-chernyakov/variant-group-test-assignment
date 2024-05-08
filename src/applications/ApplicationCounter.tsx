"use client"

import { useApplications } from "~/applications/store"
import ProgressBar from "~/ui/ProgressBar"
import { mapResult } from "~/utils/result"

export default function ApplicationsCounter() {
  const applicationsResult = useApplications()

  return mapResult(applicationsResult, {
    onError: () => null, // TODO: handle error
    onLoading: () => null, // TODO: handle loading
    onData: (applications) => {
      const applicationsCount = applications.length

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

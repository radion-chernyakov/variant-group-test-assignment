"use client"

import * as stylex from "@stylexjs/stylex"
import { notFound } from "next/navigation"
import { useState } from "react"
import { type Application, updateApplication } from "~/applications/store"
import { type ApplicationFormData } from "~/components/ApplicationForm"
import ApplicationForm from "~/components/ApplicationForm"
import ApplicationLetterPreview from "~/ui/ApplicationLetterPreview"
import { type Result } from "~/utils/result"

import { useApplication } from "./store"

export default function UpdateApplication({
  applicationId,
  generateLetter,
}: {
  applicationId: string
  generateLetter: (data: ApplicationFormData) => Promise<string>
}) {
  const application = useApplication(applicationId)
  const [result, setResult] = useState<Result<Application> | null>(() => {
    if (!application) return null

    return { data: application }
  })

  if (!application || !result) {
    return notFound()
  }

  return (
    <div {...stylex.props(styles.container)}>
      <ApplicationForm
        initialValues={{
          position: application.position,
          skills: application.skills,
          company: application.company,
          details: application.details,
        }}
        onSubmit={async ({ data, onResult }) => {
          setResult({ loading: true })
          try {
            const letter = await generateLetter(data)
            const application = updateApplication({
              id: applicationId,
              ...data,
              letter,
            })
            setResult({ data: application })
            onResult({})
          } catch {
            onResult({ error: "Something went wrong" })
            setResult({ error: "Something went wrong" })
          }
        }}
      />
      <ApplicationLetterPreview applicationResult={result} />
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    flexGrow: "1",
  },
})

"use client"

import { notFound } from "next/navigation"
import { useState, useRef } from "react"
import { type Application, updateApplication } from "~/applications/store"
import { type ApplicationFormData } from "~/components/ApplicationForm"
import ApplicationForm from "~/components/ApplicationForm"
import ApplicationLetterPreview from "~/ui/ApplicationLetterPreview"
import FormWithPreviewLayout from "~/ui/FormWithPreviewLayout"
import { type Result } from "~/utils/result"

import { useApplication } from "./store"

export default function UpdateApplication({
  applicationId,
  generateLetter,
}: {
  applicationId: string
  generateLetter: (data: ApplicationFormData) => Promise<string>
}) {
  const previewRef = useRef<HTMLDivElement>(null)
  const application = useApplication(applicationId)
  const [result, setResult] = useState<Result<Application> | null>(() => {
    if (!application) return null

    return { data: application }
  })

  if (!application || !result) {
    return notFound()
  }

  return (
    <FormWithPreviewLayout
      form={
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
              previewRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            } catch {
              onResult({ error: "Something went wrong" })
              setResult({ error: "Something went wrong" })
            }
          }}
        />
      }
      preview={
        <ApplicationLetterPreview ref={previewRef} applicationResult={result} />
      }
    />
  )
}

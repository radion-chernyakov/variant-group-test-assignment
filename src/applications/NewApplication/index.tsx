"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { type Application, addApplication } from "~/applications/store"
import { type ApplicationFormData } from "~/components/ApplicationForm"
import ApplicationForm from "~/components/ApplicationForm"
import ApplicationLetterPreview from "~/ui/ApplicationLetterPreview"
import FormWithPreviewLayout from "~/ui/FormWithPreviewLayout"
import { type Result } from "~/utils/result"

export default function NewApplication({
  generateLetter,
}: {
  generateLetter: (data: ApplicationFormData) => Promise<string>
}) {
  const router = useRouter()
  const [result, setResult] = useState<Result<Application> | null>(null)

  return (
    <FormWithPreviewLayout
      form={
        <ApplicationForm
          onSubmit={async ({ data, onResult }) => {
            setResult({ loading: true })
            try {
              const letter = await generateLetter(data)
              const application = addApplication({
                ...data,
                letter,
              })
              setResult({ data: application })
              onResult({})
              router.push(`/applications/${application.id}`)
            } catch {
              onResult({ error: "Something went wrong" })
              setResult({ error: "Something went wrong" })
            }
          }}
        />
      }
      preview={<ApplicationLetterPreview applicationResult={result} />}
    />
  )
}

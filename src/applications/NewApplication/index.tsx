"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { type ApplicationFormData } from "~/applications/ApplicationForm"
import ApplicationForm from "~/applications/ApplicationForm"
import ApplicationLetterPreview from "~/applications/ApplicationLetterPreview"
import { type Application, addApplication } from "~/applications/store"
import Button from "~/ui/Button"
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
          renderSubmitButton={({ loading, disabled }) => (
            <Button
              grow
              disabled={disabled}
              type="submit"
              size="medium"
              intent="submit"
              loading={loading}
            >
              Generate Now
            </Button>
          )}
          onSubmit={async ({ data, onResult }) => {
            setResult({ loading: true })
            try {
              const letter = await generateLetter(data)
              const application = addApplication({
                ...data,
                letter,
              })
              const result = { data: application } as Result<Application>
              setResult(result)
              onResult(result)
              router.push(`/applications/${application.id}`)
            } catch {
              const result = { error: "Something went wrong" }
              onResult(result)
              setResult(result)
            }
          }}
        />
      }
      preview={<ApplicationLetterPreview applicationResult={result} />}
    />
  )
}

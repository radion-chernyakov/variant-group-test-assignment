"use client"

import * as stylex from "@stylexjs/stylex"
import { notFound } from "next/navigation"
import { useState, useRef } from "react"
import { type ApplicationFormData } from "~/applications/ApplicationForm"
import ApplicationForm from "~/applications/ApplicationForm"
import ApplicationLetterPreview from "~/applications/ApplicationLetterPreview"
import { type Application, updateApplication } from "~/applications/store"
import Button from "~/ui/Button"
import FormWithPreviewLayout from "~/ui/FormWithPreviewLayout"
import RepeatIcon from "~/ui/icons/Repeat.svg"
import { mapResult, type Result } from "~/utils/result"

import { spacing } from "../../ui/tokens.stylex"
import HitYourGoal from "../HitYourGoal"
import { useApplication } from "../store"

export default function UpdateApplication({
  applicationId,
  generateLetter,
}: {
  applicationId: string
  generateLetter: (data: ApplicationFormData) => Promise<string>
}) {
  const previewRef = useRef<HTMLDivElement>(null)
  const applicationResult = useApplication(applicationId)
  const [result, setResult] = useState<Result<Application> | null>(null)

  return mapResult(applicationResult, {
    onError: () => notFound(),
    onLoading: () => null,
    onData: (application) => (
      <div {...stylex.props(styles.container)}>
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
                    block: "nearest",
                  })
                } catch {
                  onResult({ error: "Something went wrong" })
                  setResult({ data: application })
                }
              }}
              renderSubmitButton={({ loading, disabled }) => (
                <Button
                  grow
                  icon={RepeatIcon}
                  iconPosition="block-start"
                  disabled={disabled}
                  type="submit"
                  size="medium"
                  intent="action"
                  loading={loading}
                >
                  Try Again
                </Button>
              )}
            />
          }
          preview={
            <ApplicationLetterPreview
              ref={previewRef}
              applicationResult={result ?? { data: application }}
            />
          }
        />
        <HitYourGoal />
      </div>
    ),
  })
}

const styles = stylex.create({
  container: {
    flexGrow: "1",
    display: "flex",
    gap: spacing.xxLarge,
    flexDirection: "column",
  },
})

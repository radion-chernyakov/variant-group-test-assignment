"use client"

import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { type Application, addApplication } from "~/applications/store"
import { type ApplicationFormData } from "~/components/ApplicationForm"
import ApplicationForm from "~/components/ApplicationForm"
import ApplicationLetterPreview from "~/ui/ApplicationLetterPreview"

type Result<T> =
  | {
      data: T
      loading?: undefined
      error?: undefined
    }
  | {
      data?: undefined
      loading: true
      error?: undefined
    }
  | {
      data?: undefined
      loading?: undefined
      error: string
    }

export default function NewApplication({
  generateLetter,
}: {
  generateLetter: (data: ApplicationFormData) => Promise<string>
}) {
  const [result, setResult] = useState<Result<Application> | null>(null)
  const preview = (() => {
    if (result?.loading) return { generating: true }
    if (result?.data) return { letter: result.data.letter }

    return null
  })()
  return (
    <div {...stylex.props(styles.container)}>
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
          } catch {
            onResult({ error: "Something went wrong" })
            setResult({ error: "Something went wrong" })
          }
        }}
      />
      <ApplicationLetterPreview preview={preview} />
    </div>
  )
}

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
  },
})

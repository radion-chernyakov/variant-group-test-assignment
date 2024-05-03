"use client"

import * as stylex from "@stylexjs/stylex"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { type Application, addApplication } from "~/applications/store"
import { type ApplicationFormData } from "~/components/ApplicationForm"
import ApplicationForm from "~/components/ApplicationForm"
import ApplicationLetterPreview from "~/ui/ApplicationLetterPreview"
import { type Result } from "~/utils/result"

import { spacing, type Query } from "../../ui/tokens.stylex"

export default function NewApplication({
  generateLetter,
}: {
  generateLetter: (data: ApplicationFormData) => Promise<string>
}) {
  const router = useRouter()
  const [result, setResult] = useState<Result<Application> | null>(null)

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
            onResult({})
            console.log("Before redirect")
            router.push(`/applications/${application.id}`)
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

const mediumMediaQuery: Query["medium"] = "@media (max-width: 768px)"

const styles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr 1fr",
      [mediumMediaQuery]: "1fr",
    },
    gap: spacing.xLarge,
    flexGrow: "1",
  },
})

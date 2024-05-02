"use client"

import * as stylex from "@stylexjs/stylex"
import { useId, useState, type ReactNode } from "react"
import { useZorm, unstable_inputProps as inputProps } from "react-zorm"
import z from "zod"
import Button from "~/ui/Button"
import Input from "~/ui/Input"
import Label from "~/ui/Label"
import Text from "~/ui/Text"
import Textarea from "~/ui/Textarea"

import { spacing } from "../../ui/tokens.stylex"

const formSchema = z.object({
  position: z.string().min(1),
  company: z.string().min(1),
  skills: z.string().min(1),
  details: z.string().min(15).max(1200),
})

type ApplicationFormData = z.infer<typeof formSchema>

type InitialValues = Partial<ApplicationFormData>

type Result = { error?: undefined } | { error: string }

type Props = {
  initialValues?: InitialValues
  onSubmit: ({
    data,
    onResult,
  }: {
    data: ApplicationFormData
    onResult: (result: Result) => void
  }) => void
}

const formInputs = [
  {
    name: "position",
    component: Input,
    label: "Job title",
    placeholder: "Product manager",
  },
  {
    name: "company",
    component: Input,
    label: "Company",
    placeholder: "Apple",
  },
  {
    name: "skills",
    component: Input,
    label: "I am good at...",
    placeholder: "HTML, CSS and doing things in time",
  },
  {
    name: "details",
    component: Textarea,
    label: "Additional details",
    placeholder:
      "I want to help you build awesome solutions to accomplish your goals and vision",
  },
] as const

type FormState =
  | {
      loading: true
      error?: undefined
    }
  | {
      loading: false
      error: string | null
    }

export default function ApplicationForm({
  initialValues = {},
  onSubmit,
}: Props) {
  const [formState, setFormState] = useState<FormState | null>(null)
  const form = useZorm("application", formSchema, {
    onValidSubmit: (e) => {
      e.preventDefault()
      setFormState({ loading: true })
      onSubmit({
        data: e.data,
        onResult: (result) => {
          if (result.error)
            setFormState({ loading: false, error: result.error })
          else setFormState(null)
        },
      })
    },
  })

  const isValid = form.validation?.success ?? true

  const inputs = formInputs.map((formInput) => ({
    field: formInput.name,
    input: () => {
      const shouldIgnoreError = (error: z.ZodIssue) => {
        if (formInput.component !== Textarea) return false

        const isTooBig = error.code === "too_big" && error.type === "string"
        const isTooSmall = error.code == "too_small" && error.type === "string"

        return isTooBig || isTooSmall
      }

      const error = form.errors[formInput.name]()

      const errorMessageNode =
        error && !shouldIgnoreError(error) ? (
          <ErrorMessage
            message={error.message}
            id={form.fields[formInput.name]("errorid")}
          />
        ) : null

      return (
        <InputContainer
          label={formInput.label}
          errorMessage={errorMessageNode}
          renderInput={(id) => (
            <formInput.component
              id={id}
              placeholder={formInput.placeholder}
              defaultValue={initialValues[formInput.name]}
              {...form.fields[formInput.name](inputProps)}
            />
          )}
        />
      )
    },
  }))

  const getInput = (field: keyof ApplicationFormData) =>
    inputs.find(({ field: fieldI }) => fieldI === field)?.input()

  return (
    <form {...stylex.props(style.container)} ref={form.ref}>
      <div {...stylex.props(style.jobTitle)}>{getInput("position")}</div>
      <div {...stylex.props(style.company)}>{getInput("company")}</div>
      <div {...stylex.props(style.skills)}>{getInput("skills")}</div>
      <div {...stylex.props(style.details)}>{getInput("details")}</div>
      {formState?.error && (
        <div {...stylex.props(style.error)}>
          <ErrorMessage message={formState.error} />
        </div>
      )}
      <div {...stylex.props(style.submit)}>
        <Button
          grow
          disabled={!isValid}
          type="submit"
          size="medium"
          intent="submit"
          loading={formState?.loading}
        >
          Generate Now
        </Button>
      </div>
    </form>
  )
}

function ErrorMessage({ message, id }: { message: string; id?: string }) {
  return (
    <Text id={id} colorScheme="danger" colorVariant="light" size="xSmall">
      {message}
    </Text>
  )
}

function InputContainer({
  label,
  renderInput,
  errorMessage,
}: {
  label: string
  renderInput: (id: string) => ReactNode
  errorMessage: ReactNode
}) {
  const id = useId()
  return (
    <div {...stylex.props(style.inputContainer)}>
      <Label htmlFor={id}>{label}</Label>
      {renderInput(id)}
      {errorMessage}
    </div>
  )
}

const style = stylex.create({
  container: {
    height: "100%",
    display: "grid",
    gridTemplateAreas: {
      default: `
"jobTitle company"
"skills   skills"
"details  details"
"error    error"
"submit   submit"
      `,
      // TODO: media query OR container query to one-col layout
    },
    gridTemplateRows: {
      default: "max-content max-content 1fr max-content",
    },
    gridTemplateColumns: {
      default: "1fr 1fr",
    },
    gap: spacing.normal,
  },
  jobTitle: {
    gridArea: "jobTitle",
  },
  company: {
    gridArea: "company",
  },
  skills: {
    gridArea: "skills",
  },
  details: {
    display: "flex",
    gridArea: "details",
  },
  submit: {
    display: "flex",
    gridArea: "submit",
  },
  error: {
    display: "flex",
    gridArea: "error",
  },
  inputContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    gap: spacing.xSmall,
  },
})

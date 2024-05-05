"use client"

import * as stylex from "@stylexjs/stylex"
import {
  type ComponentProps,
  useId,
  useState,
  type ReactNode,
  useDeferredValue,
} from "react"
import {
  useZorm,
  unstable_inputProps as inputProps,
  useValue,
} from "react-zorm"
import z from "zod"
import Button from "~/ui/Button"
import Input from "~/ui/Input"
import Label from "~/ui/Label"
import PageHeader from "~/ui/PageHeader"
import Text from "~/ui/Text"
import Textarea from "~/ui/Textarea"

import { spacing, type ContainerQuery } from "../../ui/tokens.stylex"

const formSchema = z.object({
  position: z.string().min(1),
  company: z.string().min(1),
  skills: z.string().min(1),
  details: z.string().min(15).max(1200),
})

export type ApplicationFormData = z.infer<typeof formSchema>

type InitialValues = Partial<ApplicationFormData>

type Result = { error?: undefined } | { error: string }

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
    component: (props: ComponentProps<typeof Textarea>) => (
      <Textarea rows={9} {...props} />
    ),
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
}: {
  initialValues?: InitialValues
  onSubmit: ({
    data,
    onResult,
  }: {
    data: ApplicationFormData
    onResult: (result: Result) => void
  }) => void
}) {
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

  const position = useValue({
    zorm: form,
    name: "position",
  })
  const company = useValue({
    zorm: form,
    name: "company",
  })
  const title = position && company ? `${position}, ${company}` : null

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
    <div {...stylex.props(style.container)}>
      <PageHeader colorVariant={title ? undefined : "light"} size="large">
        {title ?? "New application"}
      </PageHeader>

      <form {...stylex.props(style.form)} ref={form.ref}>
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
    </div>
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

const smallContainerQuery: ContainerQuery["small"] =
  "@container (max-width: 480px)"

const style = stylex.create({
  container: {
    containerType: "inline-size",
    display: "flex",
    flexDirection: "column",
    gap: spacing.normal,
  },
  form: {
    display: "grid",
    gridTemplateAreas: {
      [smallContainerQuery]: `
"jobTitle"
"company"
"skills"
"details"
"error"
"submit"
       
      `,
      default: `
"jobTitle company"
"skills   skills"
"details  details"
"error    error"
"submit   submit"
      `,
    },
    gridTemplateRows: {
      [smallContainerQuery]: "repeat(6,min-content)",
      default: "repeat(4,min-content)",
    },
    gridTemplateColumns: {
      [smallContainerQuery]: "1fr",
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
    alignSelf: "flex-start",
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

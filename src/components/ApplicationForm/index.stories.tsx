import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { type ComponentProps } from "react"

import ApplicationForm from "."

type onSubmitArg = Parameters<
  ComponentProps<typeof ApplicationForm>["onSubmit"]
>[0]

const meta: Meta<typeof ApplicationForm> = {
  args: {
    onSubmit: fn(({ onResult }: onSubmitArg) => {
      onResult({})
    }),
  },
  argTypes: {
    onSubmit: {
      options: [
        "Instant success",
        "Success with delay",
        "Instant error",
        "Error with delay",
      ],
      mapping: {
        "Instant success": fn(({ onResult }: onSubmitArg) => {
          onResult({})
        }),
        "Success with delay": fn(({ onResult }: onSubmitArg) => {
          setTimeout(() => {
            onResult({})
          }, 1000)
        }),
        "Instant error": fn(({ onResult }: onSubmitArg) => {
          onResult({ error: "Something went wrong" })
        }),
        "Error with delay": fn(({ onResult }: onSubmitArg) => {
          setTimeout(() => {
            onResult({ error: "Something went wrong" })
          }, 1000)
        }),
      },
      control: { type: "radio" },
    },
  },
  component: ApplicationForm,
  render: (props) => (
    <div style={{ height: "600px" }}>
      <ApplicationForm {...props} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof ApplicationForm>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {}

export const Prefilled: Story = {
  args: {
    initialValues: {
      position: "Product manager",
      company: "Apple",
      skills: "HTML, CSS and doing things in time",
      details:
        "I want to help you build awesome solutions to accomplish your goals and vision",
    },
  },
}

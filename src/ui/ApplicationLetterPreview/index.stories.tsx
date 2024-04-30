import type { Meta, StoryObj } from "@storybook/react"

import ApplicationLetterPreview from "./index"

const meta: Meta<typeof ApplicationLetterPreview> = {
  component: ApplicationLetterPreview,
  render: (props) => (
    <div style={{ minHeight: "620px", display: "flex" }}>
      <ApplicationLetterPreview {...props} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof ApplicationLetterPreview>

export const Default: Story = {
  name: "No data filled",
  args: {
    preview: null,
  },
}

export const Loading: Story = {
  name: "Generating",
  args: {
    preview: {
      generating: true,
    },
  },
}

export const Completed: Story = {
  args: {
    preview: {
      generating: false,
      letter: `
      Dear Apple Team,
      I am writing to express my interest in the Product Manager position.`,
    },
  },
}

export const CompletedLongText: Story = {
  name: "Completed LongText",
  args: {
    preview: {
      generating: false,
      letter: `
Dear Apple Team,
I am writing to express my interest in the Product Manager position.
My experience in the realm combined with my skills in HTML, CSS and doing things in time make me a strong candidate for this role
I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use.
I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.
Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`,
    },
  },
}

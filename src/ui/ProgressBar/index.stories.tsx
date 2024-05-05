import type { Meta, StoryObj } from "@storybook/react"

import ProgressBar from "./index"

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  args: {
    progress: 2,
    progressStyle: "rounded",
    preferTextStyle: "short",
  },
  argTypes: {
    progress: {
      type: "number",
    },
    progressStyle: {
      options: ["dots", "rounded"],
      control: { type: "radio" },
    },
    preferTextStyle: {
      options: ["short", "full"],
      control: { type: "radio" },
    },
  },
  render: (props) => (
    <div style={{ containerType: "inline-size" }}>
      <ProgressBar {...props} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  name: "Rounded, vertical",
}

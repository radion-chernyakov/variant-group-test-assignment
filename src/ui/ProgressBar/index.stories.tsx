import type { Meta, StoryObj } from "@storybook/react"

import ProgressBar from "./index"

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  args: {
    progress: 2,
    progressStyle: "rounded",
    textStyle: "short",
  },
  argTypes: {
    progress: {
      type: "number",
    },
    progressStyle: {
      options: ["dot", "rounded"],
      control: { type: "radio" },
    },
    textStyle: {
      options: ["short", "full"],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  name: "Rounded, vertical",
}

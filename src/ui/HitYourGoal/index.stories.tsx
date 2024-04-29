import type { Meta, StoryObj } from "@storybook/react"

import HitYourGoal from "./index"

const meta: Meta<typeof HitYourGoal> = {
  component: HitYourGoal,
  args: {
    progress: 2,
  },
}

export default meta
type Story = StoryObj<typeof HitYourGoal>

export const Default: Story = {}

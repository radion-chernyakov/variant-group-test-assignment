import type { Meta, StoryObj } from "@storybook/react"

import Modal from "./index"

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    children: "modal content",
  },
  render: (props) => (
    <div>
      <Modal {...props} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {}

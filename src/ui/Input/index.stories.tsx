import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Label from "~/ui/Label"

import Input from "."

const meta: Meta<typeof Input> = {
  args: {
    id: "input",
    name: "someInput",
    onChange: fn(),
  },
  component: Input,
  render: (props) => (
    <div style={{ display: "flex", gap: "6px", flexDirection: "column" }}>
      <Label htmlFor="input">Label</Label>
      <Input placeholder="placeholder" {...props} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Input>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const LongText: Story = {}

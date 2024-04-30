import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Label from "~/ui/Label"

import Textarea from "."

const meta: Meta<typeof Textarea> = {
  args: {
    id: "input",
    name: "someInput",
    onChange: fn(),
  },
  component: Textarea,
  render: (props) => (
    <div style={{ display: "flex", gap: "6px", flexDirection: "column" }}>
      <Label htmlFor="input">Label</Label>
      <Textarea placeholder="Placeholder" rows={5} {...props} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Textarea>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const LongText: Story = {}

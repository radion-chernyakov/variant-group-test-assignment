import type { Meta, StoryObj } from "@storybook/react";

import Text from "./index";

const meta: Meta<typeof Text> = {
  component: Text,
  args: {
    children: "Text",
    weight: "normal",
  },
  argTypes: {
    size: {
      options: ["xSmall", "small", "medium", "large", "xLarge"],
      control: {
        type: "radio",
      },
    },
    weight: {
      options: ["light", "normal", "medium", "semibold", "bold"],
      control: {
        type: "radio",
      },
    },
  },
  render: (props) => <Text {...props} />,
};

export default meta;
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    size: "medium",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./index";

const FakeIcon = ({ height, width }: { height: number; width: number }) => (
  <div
    style={{
      height,
      width,
      borderRadius: "100%",
      backgroundColor: "currentcolor",
    }}
  />
);

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    onClick: fn(),
    children: "Create New",
  },
  argTypes: {
    size: {
      options: ["small", "medium"],
      control: {
        type: "radio",
      },
    },
    intent: {
      options: ["submit", "action", "functional"],
      control: {
        type: "radio",
      },
    },
    icon: {
      // "Without icon" case should be represented as empty string to make `truthy` condition work.
      // Otherwise with `eq: "With Icon"` Storybook wouldn't pass `iconPosition` to the component
      options: ["With Icon", ""],
      mapping: {
        "With Icon": FakeIcon,
        "": undefined,
      },
      control: {
        type: "radio",
      },
    },
    label: {
      type: "string",
      if: {
        arg: "children",
        truthy: false,
      },
    },
    iconPosition: {
      options: ["block-start", "block-end"],
      control: {
        type: "radio",
      },
      if: { arg: "icon", truthy: true },
    },
    disabled: {
      options: [true, false],
      control: {
        type: "radio",
      },
    },
  },
  render: (props) => <Button {...props} />,
};

export default meta;
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    size: "medium",
    intent: "submit",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    intent: "submit",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    intent: "submit",
  },
};

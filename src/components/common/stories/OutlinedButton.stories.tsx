import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import "../../../styles/globals.css";
import { OutlinedButton } from "../OutlinedButton";
import { InfoIcon } from "../../../assets/icons/InfoIcon";

const meta: Meta<typeof OutlinedButton> = {
  title: "Common/OutlinedButton",
  component: OutlinedButton,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    className: { control: "text" },
    icon: { control: undefined },
  },
  args: { handleClick: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: "12rem", height: "2.8rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OutlinedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: "Outlined Button",
  },
};
export const WithIcon: Story = {
  args: {
    text: "With Icon",
    icon: <InfoIcon />,
  },
};

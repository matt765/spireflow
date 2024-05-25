import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import "../../../styles/globals.css";
import { ContainedButton } from "../ContainedButton";
import { InfoIcon } from "../../../assets/icons/InfoIcon";

const meta: Meta<typeof ContainedButton> = {
  title: "Common/ContainedButton",
  component: ContainedButton,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    loading: { control: "boolean" },
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
} satisfies Meta<typeof ContainedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: "Contained Button",
    loading: false,
  
  },
};
export const WithIcon: Story = {
  args: {
    text: "With Icon",
    loading: false,    
    icon: <InfoIcon />
  },
};

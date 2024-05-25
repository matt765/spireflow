import type { Meta, StoryObj } from "@storybook/react";

import "../../../styles/globals.css";
import { Select } from "../Select";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    customOnDesktop: { control: "boolean" },
    customOptions: { control: undefined },
    direction: { control: "radio" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "12rem", height: "2.8rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Select",
    value: "Select option",
    customOnDesktop: true,
    customOptions: ["10", "50", "100"],
    direction: "bottom",
  },
};

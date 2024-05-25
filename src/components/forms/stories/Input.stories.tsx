import type { Meta, StoryObj } from "@storybook/react";

import "../../../styles/globals.css";
import { Input } from "../Input";
import { InfoIcon } from "../../../assets/icons/InfoIcon";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    icon: { control: undefined },
    value: { control: "text" },
    placeholder: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "12rem", height: "2.8rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Placeholder",
  },
};
export const WithIcon: Story = {
  args: {
    icon: <InfoIcon />,
    placeholder: "Placeholder",
  },
};

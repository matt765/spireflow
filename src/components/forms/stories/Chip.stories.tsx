import type { Meta, StoryObj } from "@storybook/react";

import "../../../styles/globals.css";
import { Chip } from "../Chip";

const meta: Meta<typeof Chip> = {
  title: "Forms/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "12rem", height: "2.8rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Chip content here"
  },
};

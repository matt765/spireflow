import type { Meta, StoryObj } from "@storybook/react";

import "../../../styles/globals.css";
import { Card } from "../Card";

const meta: Meta<typeof Card> = {
  title: "Common/Card",
  component: Card,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem", height: "22.8rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <>Card content</>,
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import "../../../styles/globals.css";
import { Tooltip } from "../Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Common/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "fit-content", height: "2.8rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

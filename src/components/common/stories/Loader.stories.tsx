import type { Meta, StoryObj } from "@storybook/react";

import "../../../styles/globals.css";
import { FullScreenLoader } from "../FullScreenLoader";

const meta: Meta<typeof FullScreenLoader> = {
  title: "Common/FullScreenLoader",
  component: FullScreenLoader,
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },

  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ width: "fit-content", height: "2.8rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FullScreenLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

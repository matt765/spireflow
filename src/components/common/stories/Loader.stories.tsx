import type { Meta, StoryObj } from "@storybook/react";

import "../../../styles/globals.css";
import { Loader } from "../Loader";

const meta: Meta<typeof Loader> = {
  title: "Common/Loader",
  component: Loader,
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
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

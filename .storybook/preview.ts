import type { Preview } from "@storybook/react";
import { withThemeByClassName } from '@storybook/addon-themes';

import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;


export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
   
    },
    defaultTheme: 'light',
  }),
];
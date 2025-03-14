interface ChartColors {
  primary: {
    stroke: string;
    fill: string;
    disabled: string;
  };
  secondary: {
    stroke: string;
    fill: string;
    disabled: string;
  };
}

export const useChartColors = (
  theme: "charcoal" | "dark" | "obsidian" | "light"
): ChartColors => {
  const themeColors = {
    charcoal: {
      primary: {
        stroke: "rgb(61, 185, 133)",
        fill: "rgb(98, 136, 227)",
        disabled: "rgb(255,255,255,0.1)",
      },
      secondary: {
        stroke: "hsl(199.4, 13.3%, 45.7%)",
        fill: "hsl(199.4, 13.3%, 45.7%)",
        disabled: "rgb(255,255,255,0.1)",
      },
    },
    dark: {
      primary: {
        stroke: "rgb(6, 182, 212)",
        fill: "rgb(6, 182, 212)",
        disabled: "rgb(255,255,255,0.1)",
      },
      secondary: {
        stroke: "rgb(6, 182, 212)",
        fill: "rgb(255,255,255,0.2)",
        disabled: "rgb(255,255,255,0.1)",
      },
    },
    obsidian: {
      primary: {
        stroke: "rgb(61, 185, 133)",
        fill: "rgb(61, 185, 133)",
        disabled: "rgb(255,255,255,0.1)",
      },
      secondary: {
        stroke: "rgb(83,133,198)",
        fill: "rgb(83,133,198)",
        disabled: "rgb(255,255,255,0.1)",
      },
    },
    light: {
      primary: {
        stroke: "rgb(118, 167, 247)",
        fill: "rgb(118, 167, 247)",
        disabled: "rgb(125, 214, 230)",
      },
      secondary: {
        stroke: "rgb(125, 214, 230)",
        fill: "rgb(125, 214, 230)",
        disabled: "rgb(255,255,255,0.1)",
      },
    },
  };

  // If theme is undefined, return the colors for the theme that was actually applied to the document
  if (!theme) {
    // Check which theme class is currently on the document
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("obsidian")) {
        return themeColors.obsidian;
      } else if (document.documentElement.classList.contains("light")) {
        return themeColors.light;
      } else if (document.documentElement.classList.contains("dark")) {
        return themeColors.dark;
      }
    }
    // Default to charcoal if we can't determine from the DOM
    return themeColors.charcoal;
  }

  return themeColors[theme];
};

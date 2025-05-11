interface ChartColors {
  primary: {
    stroke: string;
    fill: string;
    disabled: string;
    grid: string;
  };
  secondary: {
    stroke: string;
    fill: string;
    disabled: string;
    grid: string;
  };
}

export const useChartColors = (
  theme: "charcoal" | "midnight" | "obsidian" | "snowlight"
): ChartColors => {
  const themeColors = {
    charcoal: {
      primary: {
        stroke: "rgb(61, 185, 133)",
        fill: "rgb(98, 136, 227)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
      },
      secondary: {
        stroke: "hsl(199.4, 13.3%, 45.7%)",
        fill: "hsl(199.4, 13.3%, 45.7%)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
      },
    },
    midnight: {
      primary: {
        stroke: "rgb(6, 182, 212)",
        fill: "rgb(6, 182, 212)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
      },
      secondary: {
        stroke: "rgb(6, 182, 212)",
        fill: "rgb(255,255,255,0.2)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
      },
    },
    obsidian: {
      primary: {
        stroke: "rgb(61, 185, 133)",
        fill: "rgb(61, 185, 133)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
      },
      secondary: {
        stroke: "rgb(83,133,198)",
        fill: "rgb(83,133,198)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
      },
    },
    snowlight: {
      primary: {
        stroke: "rgb(118, 167, 247)",
        fill: "rgb(118, 167, 247)",
        disabled: "rgb(125, 214, 230)",
        grid: "rgba(0,0,0,0.2)",
      },
      secondary: {
        stroke: "rgb(125, 214, 230)",
        fill: "rgb(125, 214, 230)",
        disabled: "rgb(255,255,255,0.1)",
        grid: "rgba(255,255,255,0.1)",
      },
    },
  };

  if (!theme) {
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("obsidian")) {
        return themeColors.obsidian;
      } else if (document.documentElement.classList.contains("snowlight")) {
        return themeColors.snowlight;
      } else if (document.documentElement.classList.contains("midnight")) {
        return themeColors.midnight;
      } else if (document.documentElement.classList.contains("charcoal")) {
        return themeColors.charcoal;
      }
    }

    return themeColors.obsidian;
  }

  return themeColors[theme] || themeColors.obsidian;
};

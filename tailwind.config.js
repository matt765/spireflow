const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      fontFamily: {
        inter: ["var(--inter-font)", ...fontFamily.sans],
        nunito: ["var(--nunito-font)", ...fontFamily.sans],
      },
      colors: {
        // Light Mode
        primaryBg: "white",
        secondaryBg: "rgb(240, 240, 245, 0.4)",
        primaryText: "black",
        secondaryText: "rgb(0,0,0,0.6)",
        mainColor: "#7376f2",
        mainColorSecondary: "#7376f2",
        mainColorSecondaryHover: "rgb(140, 142, 232)",
        navItemBg: "rgb(0,0,0,0)",
        navItemBgHover: "rgba(196, 194, 255, 0.2)",
        navItemActiveBg: "rgba(196, 194, 255, 0.2)",
        navItemActiveBgHover: "rgba(196, 194, 255, 0.4)",
        navSectionTitleText: "black",
        navItemText: "rgb(0,0,0,0.6)",
        navItemTextActive: "rgb(111, 106, 248)",
        mainBorder: "rgb(0,0,0,0.1)",
        inputBg: "rgb(240, 240, 245, 0.5)",
        inputBgHover: "white",
        inputBorder: "rgb(0,0,0,0.15)",
        inputBorderHover: "rgb(0,0,0,0.1)",
        buttonActiveBg: "rgb(0,0,0,0.1)",
        outlinedButtonBgHover: "rgba(210, 210, 210, 0.4)",
        calendarBorder: "rgb(0,0,0,0.1)",
        calendarMainColor: "#9c8fdd",
        calendarTodayBg: "rgb(222, 194, 242, 0.15)",
        grayIcon: "rgb(0,0,0,0.6)",
        tableCellText: "rgb(68, 68, 68)",
        dropdownBgHover: "rgb(68, 68, 68, 0.02)",
        loaderCircleBg: "#7376f2",

        // Dark mode
        primaryBgDark: "rgb(63, 70, 85)",
        secondaryBgDark: "rgb(52, 60, 74)",
        primaryTextDark: "white",
        secondaryTextDark: "rgb(255,255,255,0.6)",
        mainColorDark: "#06b6d4",
        mainColorSecondaryDark: "rgb(17, 159, 183)",
        mainColorSecondaryHoverDark: "rgb(92, 186, 202)",
        navItemBgDark: "rgb(26, 36, 53, 0)",
        navItemBgHoverDark: "rgb(255,255,255,0.05)",
        navItemActiveBgDark: "rgb(80, 87, 102)",
        navItemActiveBgHoverDark: "rgb(95, 102, 115)",
        navSectionTitleDark: "black",
        navItemTextDark: "rgb(255,255,255,0.85)",
        navItemTextActiveDark: "white",
        mainBorderDark: "rgb(255,255,255,0.1)",
        inputBgDark: "rgb(75, 81, 96)",
        inputBgHoverDark: "rgb(82, 89, 106)",
        inputBorderDark: "rgb(255,255,255,0.1)",
        inputBorderHoverDark: "rgb(255,255,255,0.2)",
        buttonActiveBgDark: "rgb(90, 95, 108)",
        calendarBorderDark: "rgb(255,255,255,0.2)",
        calendarMainColorDark: "rgb(35,125,140)",
        calendarTodayBgDark: "rgb(222, 194, 242, 0.15)",
        grayIconDark: "rgb(255,255,255,0.6)",
        tableCellTextDark: "rgb(68, 68, 68)",
        outlinedButtonBgHoverDark: "rgb(86, 92, 108)",
        dropdownBgHoverDark: "white",
        loaderCircleBgDark: "rgb(81, 137, 147)",

        // light mode for graphs
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
        // dark mode for graphs
        "dark-tremor": {
          brand: {
            faint: "rgb(47, 55, 70)", // custom
            muted: "rgb(79, 87, 104)", // blue-950
            subtle: "rgba(79, 87, 104, 0.84)", // blue-800
            DEFAULT: "rgb(90, 150, 249)", // blue-500
            emphasis: "#60a5fa", // blue-400
            inverted: "#030712", // gray-950
          },
          background: {
            muted: "rgb(47, 55, 70, 0.8)", // custom
            subtle: "rgb(47, 55, 70)", // gray-800
            DEFAULT: "rgb(63, 70, 85)", // gray-900
            emphasis: "#d1d5db", // gray-300
          },
          border: {
            DEFAULT: "rgb(255,255,255,0.1)", // gray-800
          },
          ring: {
            DEFAULT: "rgb(0,0,0,0)", // gray-800
          },
          content: {
            subtle: "#4b5563", // gray-600
            DEFAULT: "#e1e1e1", // gray-600
            emphasis: "#e5e7eb", // gray-200
            strong: "#f9fafb", // gray-50
            inverted: "#000000", // black
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      backgroundColor: {
        'html': 'red !important',
        'body': 'red !important',
      },
      animation: {
        loader: 'loader 0.6s infinite alternate'
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: 'translate3d(0, -1rem, 0)'
          }
        }
      }
    },
    screens: {
      'xsm': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '1xl': '1400px',
      '2xl': '1536px',
      '5xl': "2000px"
    },
  },


  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("@headlessui/tailwindcss")],
};

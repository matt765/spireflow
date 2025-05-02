module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/config/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { configFile: "./src/tests/config/jest.babel.config.js" },
    ],
  },
  transformIgnorePatterns: [
    // Allow transformation for next-intl and use-intl, ignore others in node_modules
    "/node_modules/(?!next-intl|use-intl)/",
    // Keep your existing pnp pattern if needed
    "\\.pnp\\.[^\\/]+$",
  ],
  rootDir: "../../../",
  testMatch: [
    "<rootDir>/src/tests/hooks/**/*.test.tsx",
    "<rootDir>/src/tests/hooks/**/*.test.ts",
  ],
};

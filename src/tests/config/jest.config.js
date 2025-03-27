module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/tests/config/jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './src/tests/config/jest.babel.config.js' }],
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '\\.pnp\\.[^\\/]+$'
    ],
    rootDir: '../../../',
    testMatch: [
        "<rootDir>/src/tests/hooks/**/*.test.tsx",
        "<rootDir>/src/tests/hooks/**/*.test.ts"
    ]
};
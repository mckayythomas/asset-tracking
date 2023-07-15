import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["<rootDir>"],
    transform: {
        "^.+\\.tsx?$": ['ts-jest', { diagnostics: false }],
    },
    // testMatch: ["**/__tests__/*.test.ts"],
    testRegex: "(/__tests__/.*\\.test)\\.ts$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    coveragePathIgnorePatterns: ["/node_modules/"],
    clearMocks: true,
    globals: {
    },
    setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts']

};

export default config;



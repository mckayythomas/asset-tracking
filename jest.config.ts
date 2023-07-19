import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { diagnostics: false }]
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/db/",
        "<rootDir>/src/utils/",
        "<rootDir>/src/oauth/"
    ],
    clearMocks: true,
    globals: {}
};

export default config;

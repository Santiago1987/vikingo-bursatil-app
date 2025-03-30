export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json", // Adjust based on your tsconfig file location
        diagnostics: true, // Enable diagnostics for better error reporting
      },
    ],
  },
  transformIgnorePatterns: ["node_modules"],
  testMatch: ["**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts"], // Adjust based on your file extensions
  preset: "ts-jest/presets/default-esm", // Adjust based on your setup
};

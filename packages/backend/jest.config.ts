module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules"],
  testMatch: ["**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts"], // Adjust based on your file extensions
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  preset: "ts-jest/presets/default-esm", // Adjust based on your setup
};

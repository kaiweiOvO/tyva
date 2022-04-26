/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageDirectory: "coverage",
};

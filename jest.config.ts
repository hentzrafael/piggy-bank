/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import nextJest from 'next/jest.js';
import type {Config} from 'jest';
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',


});

const config: Config = {
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  //ld be used to instrument code for coverage
  coverageProvider: "v8",

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['<rootDir>/src/common/singleton.ts'],
  
};

export default createJestConfig(config);

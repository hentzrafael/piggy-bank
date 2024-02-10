import nextJest from 'next/jest.js';
import type {Config} from 'jest';
const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['<rootDir>/src/common/singleton.ts'],
};

export default createJestConfig(config);

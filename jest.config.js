'use strict'
module.exports = {
  verbose: true,
  // preset: 'jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.js'],
  coverageReporters: ['json', 'lcov', 'text'],
  clearMocks: true,
  coverageThreshold: {
    global: {
      // Still in snapshot status!
      // this needs improving
      statements: 56,
      functions: 6,
      branches: 25,
      lines: 56
    }
  },
  reporters: ['jest-junit', 'default']
}
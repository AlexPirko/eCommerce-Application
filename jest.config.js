module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1',
    // '^@components/(.ts)$': '<rootDir>/src/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: [
    "<rootDir>",
  ],
};

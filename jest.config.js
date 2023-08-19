module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components/(.ts)$': '<rootDir>/src/components/$1'
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: [
    "<rootDir>",
  ]
};

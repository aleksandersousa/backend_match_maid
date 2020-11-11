export default {
  clearMocks: true,
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx',
    'node'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  modulePathIgnorePatterns: ['<rootDir>/node_modules/']
}

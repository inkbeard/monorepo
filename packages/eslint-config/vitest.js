/*
 * This is a custom ESLint configuration for use with
 * internal libraries that utilize vitest.
 *
 * This config extends the eslint-plugin-vitest for projects using vitest.
 * For more information, see https://github.com/vitest-dev/eslint-plugin-vitest
 *
 */

module.exports = {
  'plugins': ['@vitest'],
  'extends': ['plugin:@vitest/legacy-recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
    '**/*.cy.*',
  ],
  rules: {
    '@vitest/padding-around-all': 1,
    '@vitest/prefer-to-be': 1,
    '@vitest/prefer-to-have-length': 1,
    '@vitest/prefer-mock-promise-shorthand': 1,
    '@vitest/no-disabled-tests':
      process.env.NODE_ENV === 'production' ? 2 : 1,
    '@vitest/no-focused-tests':
      process.env.NODE_ENV === 'production' ? 2 : 1,
    '@vitest/prefer-hooks-in-order': 1,
    '@vitest/prefer-lowercase-title': [
      1,
      {
        ignore: ['describe'],
        ignoreTopLevelDescribe: true,
      },
    ],
    '@vitest/consistent-test-it': [
      1,
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],
    '@vitest/prefer-hooks-on-top': 1,
    '@vitest/no-standalone-expect': 2,
  },
};

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/*
 * This is a custom ESLint configuration for use with
 * internal libraries that utilize Vue.
 *
 * This config extends the eslint-config-typescript for vue projects.
 * For more information, see https://github.com/vuejs/eslint-config-typescript
 *
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  rules: {
    'vue/attributes-order': ['warn', {
      alphabetical: true,
    }],
    // Require indenting with 2 spaces in script block
    'vue/script-indent': ['warn', 2, { baseIndent: 1 }],
  }
};

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
    '@vue/eslint-config-airbnb-with-typescript'
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
    {
      files: ["*.js?(x)", "*.ts?(x)"],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true }
        ],
      }
    },
    {
      "files": ["*.vue"],
      "rules": {
        // Turning off since vue/script-indent handles this
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/indent': ['off'],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
  ],
  rules: {
    // import rules
    'import/prefer-default-export': 0,
    // vue rules
    'vue/attributes-order': ['warn', { alphabetical: true }],
    'vue/custom-event-name-casing': ['warn', 'camelCase'],
    'vue/define-props-declaration': 'error',
    // come back to this one
    // 'vue/max-template-depth': ['error', { maxDepth: 4 }],
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-root-v-if': 'error',
    'vue/no-unused-emit-declarations': 'error',
    'vue/no-unused-properties': 'error',
    'vue/no-unused-refs': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': ['warn', 'always'],
    'vue/prefer-true-attribute-shorthand': ['warn', 'always'],
    'vue/prefer-separate-static-class': 'error',
    'vue/require-emit-validator': 'error',
    'vue/require-macro-variable-name': 'error',
    'vue/require-prop-comment': ['error', { 'type': 'JSDoc' }],
    'vue/script-indent': ['warn', 2, { baseIndent: 1 }],
    'vue/max-len': ['error', {
      'code': 120,
      'template': 120,
      'comments': 120,
      'ignorePattern': ' d=', // Ignore SVG paths
      'ignoreComments': true,
      'ignoreUrls': true,
      'ignoreStrings': false,
      'ignoreTemplateLiterals': false,
      "ignoreRegExpLiterals": false,
      "ignoreHTMLAttributeValues": false,
      "ignoreHTMLTextContents": false,
    }],
    // misc
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'never', prev: ['const', 'let'], next: ['const', 'let'] },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
  }
};

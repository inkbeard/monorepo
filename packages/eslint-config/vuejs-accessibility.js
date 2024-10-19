/*
 * This is a custom ESLint configuration for use with
 * internal libraries that utilize Vue.
 *
 * This config extends the eslint-plugin-vuejs-accessibility for vue projects.
 * For more information, see https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/
 *
 */
module.exports = {
  plugins: ['vuejs-accessibility'],
  extends: ['plugin:vuejs-accessibility/recommended',],
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
};

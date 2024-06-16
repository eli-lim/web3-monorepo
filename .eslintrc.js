/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['contracts/**', 'frontend/**'],
  extends: ['@repo/eslint-config/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};

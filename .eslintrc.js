module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: 'standard-with-typescript',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/prefer-function-type': [0],
    '@typescript-eslint/strict-boolean-expressions': [0],
    '@typescript-eslint/restrict-template-expressions': [0]
  },
}

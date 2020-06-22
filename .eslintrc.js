module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: 'standard',
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
    mqq: true,
  }
}

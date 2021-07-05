const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
};

module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': RULES.OFF,
    'no-unused-vars': RULES.OFF,
    'no-underscore-dangle': 0,
    'no-use-before-define': ['error', { variables: false }],
    'no-multi-str': 0,
    'arrow-parens': 0,
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'import/no-extraneous-dependencies': 0,
    'no-mixed-operators': 0,
    'max-len': ['error', 120],
    'import/no-unresolved': 0
  }
};

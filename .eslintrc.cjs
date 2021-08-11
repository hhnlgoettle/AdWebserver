module.exports = {
  plugins: ['@babel'],
  env: {
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      configFile: './.babelrc',
    },
  },
  parser: '@babel/eslint-parser',
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'func-names': 'off',
    'linebreak-style': 'off',
    'no-ex-assign': 'off',
    'no-underscore-dangle': 'off',
  },
};

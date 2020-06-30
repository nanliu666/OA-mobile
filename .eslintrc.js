module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'no-prototype-builtins': 'off',
    semi: [2, 'never'],
    'max-len': [
      1,
      {
        code: 120
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

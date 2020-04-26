module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'jest': true,
    'jsx-control-statements/jsx-control-statements': true
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
  'globals': {
    'window': true,
    'document': true,
    'AMap': true,
    'hjMediaService': true
  },
  'extends': [
    // 'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended' // 需要另外配合babel插件使用
  ],
  'settings': {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      'webpack': {
        'config': './build/webpack.base.js'
      }
    }
  },
  'plugins': [
    'import',
    'promise',
    '@typescript-eslint',
    'react',
    'jsx-control-statements',
    'prettier'
  ],
  'rules': {
    // 'prettier/prettier': 2,
    'no-extra-semi': 0, // 禁止不必要的分号
    'quotes': ['error', 'single'], // 强制使用单引号
    'no-unused-vars': 0, // 不允许未定义的变量
    'jsx-control-statements/jsx-use-if-tag': 0,
    'react/display-name': 0,
    'no-debugger': 0,
    'arrow-parens': 0,
    'import/extensions': [
      'error', 'always', {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'class-methods-use-this': 0,
    'comma-dangle': 0,
    'consistent-return': 2,
    'func-names': 2,
    'generator-star-spacing': [0],
    'import/no-extraneous-dependencies': ['off'],
    'import/no-unresolved': 2,
    'new-cap': 0,
    'no-implicit-coercion': 0,
    'no-mixed-operators': 0,
    'no-plusplus': 0,
    'no-use-before-define': 0,
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'no-var': 'error',
    'semi': ['error', 'always'],
    'promise/param-names': 2,
    'promise/always-return': 2,
    'promise/catch-or-return': 2,
    'promise/no-native': 0
  }
};

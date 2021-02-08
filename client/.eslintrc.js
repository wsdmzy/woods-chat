// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'ignorePatterns': [
      '*.js',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
        0,
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'always'
      ],
      'eqeqeq': 2,
      // 禁止使用不规范空格
      'no-irregular-whitespace': [ 2, {
        'skipStrings': true, // 允许在字符串中使用
        'skipComments': true, // 允许在注释中使用
        'skipRegExps': true, // 允许在正则表达式中使用
        'skipTemplates': true, // 允许在模板字符串中使用
      } ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'object-curly-spacing': [ 'error', 'always' ],
      
    },
};

module.exports = {
  extends: ['prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['node_modules', '*.config.js', '.eslintrc.js', 'coverage'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/array-type': [1, { default: 'array-simple' }],
    '@typescript-eslint/await-thenable': 2,
    '@typescript-eslint/ban-types': [
      1,
      {
        types: {
          String: {
            message: 'Use string instead of String',
            fixWith: 'string',
          },
        },
      },
    ],
    '@typescript-eslint/consistent-indexed-object-style': 0, //disallow using Record
    '@typescript-eslint/explicit-member-accessibility': 0, // for typescript classes properties accessibility
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/method-signature-style': [1, 'property'],
    '@typescript-eslint/no-base-to-string': 2,
    '@typescript-eslint/no-confusing-non-null-assertion': 1,
    '@typescript-eslint/no-explicit-any': [
      1,
      {
        fixToUnknown: false,
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-implicit-any-catch': 2,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 2,
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 1,
    '@typescript-eslint/no-unnecessary-condition': 1,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 1,
    '@typescript-eslint/no-unsafe-member-access': 1,
    '@typescript-eslint/no-unsafe-return': 1,
    '@typescript-eslint/prefer-as-const': 1,
    '@typescript-eslint/prefer-enum-initializers': 1,
    '@typescript-eslint/prefer-reduce-type-parameter': 1,
    '@typescript-eslint/prefer-regexp-exec': 1,
    '@typescript-eslint/prefer-return-this-type': 1,
    '@typescript-eslint/promise-function-async': 2,
    '@typescript-eslint/restrict-plus-operands': 2,
    '@typescript-eslint/restrict-template-expressions': 2,
    '@typescript-eslint/switch-exhaustiveness-check': 1,
    '@typescript-eslint/unified-signatures': 1,
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 2,
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 1,
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 1,
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 1,
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': 2,
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 2,
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': [
          2,
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'explicit',
              constructors: 'no-public',
              methods: 'explicit',
              properties: 'off',
              parameterProperties: 'explicit',
            },
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
  ],
};

import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  {
    ignores: ['**/node_modules/', '**/.prettierignore/', '**/.next/', 'next-env.d.ts'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
    'next/core-web-vitals',
    'next/typescript',
    'next/core-web-vitals',
    'next/typescript',
  ),
  {
    languageOptions: {
      ecmaVersion: 'latest',

      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      sourceType: 'module',
    },

    plugins: {
      prettier,
    },

    rules: {
      'array-bracket-newline': [
        'error',
        {
          multiline: true,
        },
      ],

      'array-bracket-spacing': ['error', 'never'],
      'array-callback-return': 'error',
      'arrow-parens': ['error', 'as-needed'],

      'arrow-spacing': [
        'error',
        {
          after: true,
          before: true,
        },
      ],

      'block-spacing': 'error',

      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: false,
        },
      ],

      camelcase: [
        'error',
        {
          properties: 'always',
        },
      ],

      'comma-dangle': [
        'error',
        {
          arrays: 'only-multiline',
          exports: 'never',
          functions: 'ignore',
          imports: 'only-multiline',
          objects: 'only-multiline',
        },
      ],

      'comma-spacing': [
        'error',
        {
          after: true,
          before: false,
        },
      ],

      'computed-property-spacing': ['error', 'never'],
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-location': ['error', 'property'],
      'eol-last': ['error', 'always'],
      eqeqeq: ['error', 'smart'],
      'func-call-spacing': ['error', 'never'],
      'jsx-quotes': ['error', 'prefer-single'],

      'key-spacing': [
        'error',
        {
          afterColon: true,
          beforeColon: false,
        },
      ],

      'keyword-spacing': [
        'error',
        {
          after: true,
          before: true,
        },
      ],

      'multiline-ternary': ['error', 'always-multiline'],
      'no-duplicate-imports': ['error'],
      'no-empty-function': 'error',
      'no-mixed-operators': 'error',
      'no-multi-spaces': 'error',

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],

      'no-trailing-spaces': [
        'error',
        {
          skipBlankLines: true,
        },
      ],

      'no-var': 'error',
      'no-whitespace-before-property': 'error',

      'object-curly-spacing': [
        'error',
        'always',
        {
          arraysInObjects: true,
          objectsInObjects: true,
        },
      ],
      'object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],

      'padded-blocks': ['error', 'never'],

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var', 'directive'],
          prev: ['const', 'let', 'var', 'directive'],
        },
      ],

      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',

      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
      ],

      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-template': 'error',
      'prettier/prettier': 'error',
      'quote-props': ['error', 'as-needed'],
      quotes: ['error', 'single'],
      'rest-spread-spacing': ['error', 'never'],
      semi: ['error', 'always'],

      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: true,
          minKeys: 2,
          natural: false,
        },
      ],

      'sort-vars': 'error',
      'space-before-blocks': 'error',
      'spaced-comment': ['error', 'always'],
      'vars-on-top': 'error',
      yoda: 'error',
    },
  },
];

export default config;

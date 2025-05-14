import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: ['node_modules', 'dist', 'build', 'store'],
    plugins: {
      react,
      prettier,
      import: importPlugin,
    },
    rules: {
      'no-fallthrough': 'off',
      indent: ['error', 2],
      'prettier/prettier': 'error',
      'linebreak-style': [0, 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'import/no-unresolved': [2, { caseSensitive: false }],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
  },
  {
    files: ['store/**/*'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
]

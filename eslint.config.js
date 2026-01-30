import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

export default ts.config(
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
    },
    rules: {
      // Vue.js specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  }
)
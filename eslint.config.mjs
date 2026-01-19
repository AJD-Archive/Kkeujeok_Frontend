import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  // 0) 전역 무시
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/*.d.ts',
      'packages/design-system/scripts/**',
      'packages/design-system/src/routes/index.tsx',
      'packages/design-system/src/components/index.ts',
    ],
  },

  // 1) JS 권장(전역)
  js.configs.recommended,

  // 2) TS 권장(타입 인식)
  ...tseslint.configs.recommended,

  // 3) TS 파일 전용 추가 옵션/룰 (자동 tsconfig 탐색)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ✅ 일반 규칙
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-nested-ternary': 'warn',
      'no-unused-vars': 'off',

      // ✅ TypeScript 규칙
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // ✅ React 규칙
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'warn',
      'react/jsx-key': 'warn',
      'react/no-array-index-key': 'warn',
      'react/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }],
      'react/no-unescaped-entities': 'warn',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react/display-name': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-handler-names': [
        'warn',
        {
          eventHandlerPrefix: 'handle',
          eventHandlerPropPrefix: 'on',
        },
      ],
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

      // ✅ React Hooks 규칙
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // ✅ Import/Export 정렬
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // ✅ 미사용 import 제거
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'off',

      // emotion
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
    },
  },

  // 4) JS 파일 타입 검사 생략
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // 5) Prettier 충돌 룰 제거 — 항상 마지막
  eslintConfigPrettier,
);

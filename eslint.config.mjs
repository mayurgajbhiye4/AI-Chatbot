import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    ignorePatterns: [
      'node_modules/**',
      '.next/**',
      'src/generated/**', 
      '**/.prisma/**',         // Exclude .prisma folders (sometimes used for generated code)
      '**/prisma/client/**',   // Exclude generated client if present
    ],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  }),
]

export default eslintConfig  

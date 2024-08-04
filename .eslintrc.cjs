module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'prettier',
      'plugin:prettier/recommended',
      'eslint:recommended',
      'plugin:prettier/recommended',
   ],
   ignorePatterns: ['dist', '.eslintrc.cjs', '*.js', '*.ts', '*.tsx'],
   parser: '@typescript-eslint/parser',
   plugins: [
      'react-refresh',
      '@typescript-eslint',
      '@tanstack/eslint-plugin-query',
   ],
   rules: {
      'react-refresh/only-export-components': [
         'warn',
         { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'any',
      quotes: ['error', 'single'],
      'prettier/prettier': [
         'error',
         {
            tabWidth: 3,
            useTabs: false,
         },
      ],
   },
};

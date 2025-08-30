/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  jsxSingleQuote: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  plugins: ['@trivago/prettier-plugin-sort-imports'],

  importOrder: [
    '^react$',
    '^react-dom',
    '^react-dom/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@app/(.*)$',
    '^@pages/(.*)$',
    '^@widgets/(.*)$',
    '^@features/(.*)$',
    '^@entities/(.*)$',
    '^@shared/(.*)$',
    '^[./].*\\.(css|scss|sass|less)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

/** @type {import('prettier').Config} */
const config = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 120,
  importOrder: [
    '^node:$',
    '',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^/src/types$',
    '^/src/types/(.*)$',
    '^/src/config$',
    '^/src/config/(.*)$',
    '^/src/paths$',
    '^/src/data/(.*)$',
    '^/src/lib/(.*)$',
    '^/src/locales/(.*)$',
    '^/src/actions/(.*)$',
    '^/src/contexts/(.*)$',
    '^/src/hooks/(.*)$',
    '^/src/components/(.*)$',
    '^/src/styles/(.*)$',
    '',
    '^[./]',
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};

export default config;

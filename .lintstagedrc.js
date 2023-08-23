const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings 0 --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
  '*.{ts,tsx}': 'tsc-files --incremental false --noEmit',
  '*.{js,jsx,ts,tsx,json,md}': 'prettier --write',
  '*.{css,scss}': ['stylelint --quiet --fix', 'prettier --write'],
};

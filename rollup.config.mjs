import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    dir: 'build',
    format: 'es',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: ['src/stories/**', '**/*.stories.js', '**/*.test.js'],
    }),
    json(),
  ],
};

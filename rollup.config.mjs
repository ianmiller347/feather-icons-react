import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    json(),
    typescript({
      declaration: true,
      declarationDir: 'build',
      rootDir: 'src',
      exclude: ['src/stories/**', '**/*.stories.js', '**/*.test.js'],
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: [
        'src/stories/**',
        '**/*.stories.js',
        '**/*.test.js',
        'node_modules/**',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};

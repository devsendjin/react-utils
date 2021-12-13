import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

import scss from 'rollup-plugin-scss'

const __PROD__ = process.env.NODE_ENV === 'production';

const globals = { react: 'React', 'react-dom': 'ReactDOM' };

export default defineConfig({
  input: 'src/index.ts',

  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: true,
      globals,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
      globals,
    },
    {
      file: 'dist/bundle.umd.js',
      name: 'ReactUtils',
      format: 'umd',
      sourcemap: true,
      globals,
    },
  ],

  external: ['react', 'react-dom'],
  // external: ['react', 'react-dom', 'React', 'ReactDOM'],

  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    nodeResolve({
      browser: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['node_modules']
    }),
    commonjs({
      sourceMap: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules'
    }),
    scss({
      sass: require('sass'),
      output: 'dist/bundle.css',
    }),
    __PROD__ && terser(),
  ].filter(Boolean),
});

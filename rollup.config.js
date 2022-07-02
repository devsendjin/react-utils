import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import analyze from 'rollup-plugin-analyzer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

const MODE = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const __PROD__ = MODE === 'production';

console.log({ __PROD__, MODE });

const reactGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
};

const rollupSharedConfig = {
  watch: {
    clearScreen: true,
    exclude: 'node_modules/**',
    include: 'src/**',
  },

  plugins: [
    peerDepsExternal(), // Preferably set as first plugin.
    replace({
      'process.env.NODE_ENV': JSON.stringify(MODE),
      preventAssignment: true,
    }),
    nodeResolve({
      browser: true,
    }),
    commonjs({
      sourceMap: true,
    }),
    postcss({
      sourceMap: 'inline',
      extract: false,
      modules: {
        generateScopedName: __PROD__ ? '[hash:base64:6]' : '[local]--[hash:base64:5]',
      },
      minimize: __PROD__
        ? false
        : {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
      plugins: [postcssPresetEnv({ stage: 2 }), autoprefixer],
    }),
    __PROD__ &&
      terser({
        mangle: true,
        compress: {
          defaults: true,
          drop_console: false, // false by default. Pass true to discard calls to console.* functions.
          passes: 2, // 1 by default. The maximum number of times to run compress.
        },
        format: {
          comments: false, // "some" by default
          preamble: null, // null by default. When passed it must be a string and it will be prepended to the output literally. The source map will adjust for this text. Can be used to insert a comment containing licensing information, for example.
          quote_style: 3, // 0 by default. 3 - always use the original quotes.
          preserve_annotations: false, // false by default.
          ecma: 2019, // 5 by default. Desired EcmaScript standard version for output.
        },
        ecma: 2019, // 5 by default. Desired EcmaScript standard version for output.
        keep_classnames: false, // undefined by default.
        keep_fnames: false, // false by default.
        safari10: false, // false by default.
      }),
    __PROD__ &&
      analyze({
        hideDeps: true,
        summaryOnly: true,
      }),
  ].filter(Boolean),
};

export default defineConfig([
  {
    input: 'src/react.ts',

    output: [
      {
        file: 'dist/react.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/react.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/react.umd.js',
        name: 'DevUtils',
        format: 'umd',
        sourcemap: true,
      },
    ],

    watch: rollupSharedConfig.watch,

    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['node_modules'],
      }),
      ...rollupSharedConfig.plugins,
    ],
  },
  {
    input: 'src/index.ts',

    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
        globals: reactGlobals,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
        globals: reactGlobals,
      },
      {
        file: 'dist/index.umd.js',
        name: 'ReactDevUtils',
        format: 'umd',
        sourcemap: true,
        globals: reactGlobals,
      },
    ],

    watch: rollupSharedConfig.watch,

    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['node_modules'],
      }),
      ...rollupSharedConfig.plugins,
    ],
  },
]);

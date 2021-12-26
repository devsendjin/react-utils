const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const APP_ROOT = path.resolve('./');
// const APP_SRC = path.join(APP_ROOT, 'src');

const MODE = 'production';

module.exports = {
  mode: MODE,
  entry: './src/index.ts',
  output: {
    filename: 'bundle.umd.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'react-utils',
    libraryTarget: 'umd',
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devtool: 'source-map',

  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
  	'react': {
	    root: 'React',
	    commonjs: 'react',
	    commonjs2: 'react',
	  },
	  'react-dom': {
	    root: 'ReactDOM',
	    commonjs: 'react-dom',
	    commonjs2: 'react-dom',
	  },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.join(APP_ROOT, 'tsconfig.json'),
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            }
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          }
        ],
      },
    ]
  },

  optimization: {
    nodeEnv: MODE,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
        extractComments: false,
        terserOptions: {
          parse: {
            html5_comments: false,
          },
          mangle: true,
          sourceMap: false,
          compress: {
            defaults: true,
            drop_console: false, // false by default. Pass true to discard calls to console.* functions.
            keep_infinity: true, // false by default. Pass true to prevent Infinity from being compressed into 1/0, which may cause performance issues on Chrome.
            passes: 2, // 1 by default. The maximum number of times to run compress.
          },
          format: {
            comments: false, // "some" by default
            preamble: null, // null by default. When passed it must be a string and it will be prepended to the output literally. The source map will adjust for this text. Can be used to insert a comment containing licensing information, for example.
            quote_style: 3, // 0 by default. 3 - always use the original quotes.
            preserve_annotations: false, // false by default.
            ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
          },
          ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
          keep_classnames: false, // undefined by default.
          keep_fnames: false, // false by default.
          safari10: false, // false by default.
        },
      }),
    ],
  },
};

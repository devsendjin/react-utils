const path = require('path');

module.exports = {
  mode: 'production',
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
              presets: ['@babel/preset-env'],
            }
          },
          'ts-loader'
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
            options: {sourceMap: true},
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
  }
};

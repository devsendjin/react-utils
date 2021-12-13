const path = require('path');

module.exports = {
  mode: 'production',
  /*entry: './src/index.tsx',
  output: {
    filename: 'bundle.umd.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    clean: true,
  },*/

  entry: {
    // umd: {
    //   import: './src/index.tsx',
    //   library: {
    //     name: 'ReactUtils',
    //     type: 'umd',
    //     umdNamedDefine: true,
    //   },
    // },
    esm: {
      import: './src/index.tsx',
      library: {
        // name: 'ReactUtils',
        type: 'module',
      },
    },
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist'),
    environment: {
      module: true,
    },
    // libraryTarget: 'umd',
    // library: {
    //   name: 'ReactUtils',
    // },
    clean: true,
  },

  experiments: {
    outputModule: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
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
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
        	{ loader: 'style-loader' },
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
  }
};

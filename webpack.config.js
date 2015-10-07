import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let config = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      actions: path.resolve('./src/', 'actions'),
      components: path.resolve('./src/', 'components'),
      constants: path.resolve('./src/', 'constants'),
      containers: path.resolve('./src/', 'containers'),
      libs: path.resolve('./src/', 'libs'),
      reducers: path.resolve('./src/', 'reducers'),
      store: path.resolve('./src/', 'store'),
      styles: path.resolve('./src/', 'styles'),
      utils: path.resolve('./src/', 'utils')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint-loader'],
      exclude: /node_modules/
    }],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'autoprefixer'],
        include: path.join(__dirname)
      }
    ]
  }
};

export default config;

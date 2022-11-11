const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: { main: './src/index.ts' },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
    open: true,
    hot: true
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'smiler.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      fs: false,
    },
    alias: {
      handlebars: 'handlebars/dist/cjs/handlebars.runtime',
      core: path.resolve(__dirname, 'src/core'),
      api: path.resolve(__dirname, 'src/Api'),
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      styles: path.resolve(__dirname, 'src/styles'),
      controllers: path.resolve(__dirname, 'src/controllers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = () => ({
  mode: 'production',
  devtool: false,
  entry: {
    code: './src/code.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'swc-loader',
          options: {
            configFile: '.swcrc',
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
})

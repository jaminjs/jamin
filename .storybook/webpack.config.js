module.exports = {
  resolve: {
    root: __dirname + '/../src'
  },
  entry: [
    'babel-polyfill',
    __dirname + '/../src/main.js'
  ],
  loaders: [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime'],
      presets: ['es2015', 'react', 'stage-0'],
      env: {
        production: {
          presets: ['react-optimize']
        }
      }
    }
  },
  {
    test: /\.json$/,
    loader: 'json'
  }]
}

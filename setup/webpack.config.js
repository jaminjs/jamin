const path = require('path');
const fs = require('fs');

const REPO_ROOT = path.resolve(
  __dirname,
  '..'
);

const packageDirs = fs.readdirSync(path.join(REPO_ROOT, 'packages'))
  .filter(dir =>
    fs.statSync(path.join(REPO_ROOT, 'packages', dir)).isDirectory()
  );

const alias = packageDirs.reduce((obj, p) => {
  obj[p] = path.join(REPO_ROOT, 'packages', p);
  return obj;
}, {});

module.exports = {
  context: REPO_ROOT,
  entry: [
    'babel-polyfill',
    './packages/server/client.js',
  ],
  output: {
    filename: '[name]-[hash].js',
    path: REPO_ROOT + '/build',
    publicPath: '/assets/',
  },
  node: {
    // Disable webpack's overwriting of __dirname
    // This is needed for serving static assets in prod mode
    __dirname: false,
  },

  resolve: {
    alias,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
    ],
  },
};

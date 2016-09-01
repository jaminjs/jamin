path = require('path');

const REPO_ROOT = path.resolve(
  __dirname,
  '..'
);

module.exports = {
  context: REPO_ROOT,
  entry: './packages/server/client.js',
  output: {
    path: REPO_ROOT + '/build',
    publicPath: '/assets/',
  },

  resolve: {
    // Behaves similar to process.env.NODE_PATH
    modulesDirectories: [
      'packages',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          env: {
            production: {
              plugins: [
                'ramda',
              ],
            },
          },
        },
      },
    ],
  },
};

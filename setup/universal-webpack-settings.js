require('babel-register');

module.exports = {
  server: {
    input: './packages/server/index.js',
    output: './build/server/server.js',
  },
};

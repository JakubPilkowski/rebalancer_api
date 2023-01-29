const nodeExternals = require('webpack-node-externals');

/**
 * webpack v5.0.0
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  externals: [nodeExternals()],
  output: {
    // hashFunction: 'xxhash64',
    hashFunction: 'sha256',
  },
};

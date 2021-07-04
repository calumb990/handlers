const path = require('path')

module.exports = {
  entry: {
    handlers: './index.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  output:{
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    library: {
      name: 'handlers',
      type: 'umd'
    },
    globalObject: 'this'
  }
}
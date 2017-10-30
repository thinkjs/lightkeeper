const path = require('path');
const pkgName = 'pharos';
const production = process.env.npm_lifecycle_event.includes('production');
module.exports = {
  entry: {
    'main': path.join(__dirname, 'src/main.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${pkgName.toLowerCase()}${production ? '.min' : ''}.js`,
    library: pkgName,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      }
    ]
  }
};

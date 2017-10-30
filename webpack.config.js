const path = require('path');
const pkgName = 'pharos';
module.exports = {
  entry: {
    'main': path.join(__dirname, 'src/main.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${pkgName.toLowerCase()}.js`,
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

// require('dotenv').load({ silent: true })
var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'main.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
}
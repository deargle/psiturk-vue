const path = require("path");

module.exports = {
  outputDir: 'dist',
  // outputDir: path.resolve(__dirname, "templates"),
  publicPath: process.env.NODE_ENV === 'production'
    ? "/task"
    : "/",
  assetsDir: "static",
  devServer: {
    proxy: 'http://localhost:5000'
  }
}

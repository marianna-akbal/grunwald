var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: "./js/grunwald00.js",
  output: { filename: "./js/out.js" },
  watch: true,
  module: {
  loaders: [
      {
      test: /\.jsx$/, exclude: /node_modules/,
      loader: 'babel-loader',
      query: { presets: ['es2015', 'react'] }
      },
      {
                test: /\.scss$/,
                 loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
      { test: /\.jpg$|\.gif$|\.png$/, loader: "file-loader?name=[path][name].[ext]" }


    ]
  },
  plugins: [
        // new BrowserSyncPlugin({
        //     // browse to http://localhost:3000/ during development,
        //     // ./public directory is being served
        //     host: 'localhost',
        //     port: 3000,
        //     server: { baseDir: ['.'] }
        // })
    ]
}

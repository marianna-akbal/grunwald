var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: "./js/app.jsx",
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
      // { test: /\.jpg$|\.gif$|\.png$|\.svg$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]" }
      {
    test: /\.(gif|png|jpe?g|svg)$/i,
    loaders: [
      'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
    ]
  }


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

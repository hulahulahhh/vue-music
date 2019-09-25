const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "[name].js"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/ // why? 
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: "url-loader"
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        // style-loader用处？
        test: /\.css$/,
        use: ["css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 一定要引入这个插件，不然vue-loader无法生效
    // 这个插件的作用是，将你定义的其他规则复制并应用到vue文件中其他语言块（style块、script块）
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  stats: 'minimal'
};

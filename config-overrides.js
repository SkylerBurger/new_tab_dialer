const { override, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      "process.env.REACT_APP_ENVIRONMENT": JSON.stringify(process.env.REACT_APP_ENVIRONMENT || "production"),
    })
  )
);
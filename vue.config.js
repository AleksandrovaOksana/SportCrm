const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.postcss$/,
          use: [ 'style-loader', 'postcss-loader' ]
        }
      ]
    }
  }
}

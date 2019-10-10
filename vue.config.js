// const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gy.duodian.com',
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 所有 Sass 共享的全局变量
        data: `@import "@/assets/style/var.scss";`
      }
    }
  }
  //   chainWebpack: config => {
  //     if (process.env.NODE_ENV === 'production') {
  //       // #region 启用GZip压缩
  //       // 先安装 yarn add compression-webpack-plugin -D
  //       // 服务端也要开启gizp
  //       config
  //         .plugin('compression')
  //         .use(CompressionPlugin, {
  //           asset: '[path].gz[query]',
  //           algorithm: 'gzip',
  //           test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
  //           threshold: 10240,
  //           minRatio: 0.8,
  //           cache: true
  //         })
  //         .tap(args => {})

  //       // #endregion

  //       // #region 忽略生成环境打包的文件，不经常改变的三方库使用cdn
  //       // 原因：减少代码的大小、也可以减少服务器的带宽，更能把这些文件缓存到客户端，客户端加载的会更快
  //       var externals = {
  //         vue: 'Vue',
  //         axios: 'axios',
  //         'vue-router': 'VueRouter'
  //         // vuex: 'Vuex'
  //       }
  //       config.externals(externals)

  //       const cdn = {
  //         css: [
  //           // element-ui css
  //           // '//unpkg.com/element-ui/lib/theme-chalk/index.css'
  //         ],
  //         js: [
  //           // vue
  //           '//cdn.staticfile.org/vue/2.6.10/vue.min.js',
  //           // vue-router
  //           '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
  //           // vuex
  //           // '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
  //           // axios
  //           '//cdn.staticfile.org/axios/0.18.0/axios.min.js'
  //         ]
  //       }
  //       config.plugin('html')
  //         .tap(args => {
  //           args[0].cdn = cdn
  //           return args
  //         })

//       // #endregion
//     }
//   }
}

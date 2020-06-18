const path = require("path");
let Webpack = require('webpack');
module.exports = {
  // publicPath: './', // 打包app时放开该配置
  // 所有的接口请求代理
  // baseUrl: process.env.VUE_APP_URL,
  lintOnSave: false, // 取消eslint限制
  outputDir: "dist-admin",
  devServer: {
    port: 8000,
    open: true,
    // overlay: {
    //     warnings: false,
    //     errors: true
    // },
    // proxy: process.env.VUE_APP_URL,
    proxy: {
      // "/T4Cloud-Vehicle-Testing": {
      //   target: 'http://localhost:18088/',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite:{
      //     '^/T4Cloud-Vehicle-Testing':''
      //   }
      // },
      // "/T4Cloud-System": {
      //   target: process.env.VUE_APP_URL,
      //   ws: true,
      //   changeOrigin: true
      // },
      // "/T4Cloud-Support": {
      //   target: process.env.VUE_APP_URL,
      //   ws: true,
      //   changeOrigin: true
      // },
      // "/T4Cloud-User": {
      //   target: process.env.VUE_APP_URL,
      //   // secure: false, // 如果是https接口，需要配置这个参数
      //   ws: true,
      //   changeOrigin: true,
      // },


      // T4Boot使用此处配置开发
      "/T4Cloud": {
        // target: process.env.VUE_APP_URL,
        target: 'http://127.0.0.1:18010',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '/T4Cloud':'/t4boot-api/T4Cloud'
        }
      },


      // T4Cloud使用此处配置开发
      // "T4Cloud": {
      //   target: process.env.VUE_APP_URL,
      //   ws: true,
      //   changeOrigin: true
      // },

    }
  },
  configureWebpack: {
    externals: {
      AMap: "AMap" // 高德地图配置
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.js"
      }
    },
    plugins:[
      new Webpack.IgnorePlugin(/\.\/health/, /\.\/src/)
    ]
  },

  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = process.env.VUE_APP_NAME + "-" + process.env.VUE_APP_DESC;
      return args;
    });
  }
};

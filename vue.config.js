
const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    devServer: {
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': '/' 
                    //重写之后url为 http://localhost:3000/xxxx
                }
            }
        }

    },

    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
        config.when(process.env.NODE_ENV === 'production', config => {
            /* 设置打包入口 */
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                vuex: 'Vuex',
                /* 'js-md5': 'md5' */
            })

            config.plugin('html').tap(args => {
                //添加参数isProd
                args[0].isProd = true
                return args
            })
        })
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.js')
            config.plugin('html').tap(args => {
                //添加参数isProd
                args[0].isProd = false
                return args
            })
        })
    },

    productionSourceMap: false
}
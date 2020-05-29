import axios from 'axios'
import qs from 'qs'
let getToken = () => {}
let logout = () => {}
let httpReq = {}
const service = axios.create({
    // 设置超时时间
    timeout: 60000,
    baseURL: process.env.VUE_APP_BASE_URL
    // POST传参序列化(添加请求拦截器)
})
const testToken = 'JioBgaLUltR0qHFE2IqseA+NkLLje7hrbYH+WkwbgG18qGIKNa+CzxFFRaQBF7IwDXkxH2wVlQSUnpO3EaP3vQ=='

let token = window.localStorage.getItem('token')
service.interceptors.request.use(config => {
    // token 授权
    if (!token) {
        token = process.env.NODE_ENV === 'production' ? getToken() || '' : testToken
        // token = getToken()
        window.localStorage.setItem('token', token)
    }
    config.headers['token'] = token
    if (config.method === 'post') {
        let contentType = config.headers['Content-Type']
        if (contentType && contentType.toLowerCase() === 'multipart/form-data') {
            // 原生表单提交，不处理默认
        } else {
            // json 提交 处理
            config.data = qs.stringify(config.data)
        }
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

const codeList = ['40004', '40002', '40003']
// 添加一个响应拦截器
service.interceptors.response.use(response => {
    const responseCode = response.status
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    const code = response.data.code
    if (responseCode === 200) {
        if (codeList.includes(code)) {
            window.localStorage.clear()
            logout()
        }
        return Promise.resolve(response.data)
    } else {
        return Promise.reject(response)
    }
}, error => {
    // 断网 或者 请求超时 状态
    if (!error.response) {
    // 请求超时状态
        if (error.message.includes('timeout')) {
            console.log('超时了')
        } else {
            // 可以展示断网组件
            console.log('断网了')
        }
        return
    }
    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status

    switch (responseCode) {
    // 401：未登录
    case 401:
        console.log('跳转登录页')
        // 跳转登录页
        // router.replace({
        //   path: '/login',
        //   query: {
        //     redirect: router.currentRoute.fullPath
        //   }
        // })
        break
    // 403: token过期
    case 403:
        console.log('登录信息过期，请重新登录')
        // 清除token
        // localStorage.removeItem('token')
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        // setTimeout(() => {
        //   router.replace({
        //     path: '/login',
        //     query: {
        //       redirect: router.currentRoute.fullPath
        //     }
        //   })
        // }, 1000)
        break
    // 404请求不存在
    case 404:
        console.log('网络请求不存在')
        break
    // 其他错误，直接抛出错误提示
    default:
        console.log(error.response.data.message)
    }
    return Promise.reject(error)
})

httpReq.install = function (Vue) {
    Vue.prototype.$http = service
}
// 1. 作为vue 的插件挂载在vue组件的this实例上
// 2. 在公用的接口请求模块使用
export {
    service as $http, httpReq
}

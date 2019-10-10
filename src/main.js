import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 引入适配脚本
import './utils/rem'

// 引入全局http请求函数
import { httpReq } from './plugins/httpReq'

// 引入全局组件注册
import './components'

import { Button } from 'vant'

Vue.use(Button)

Vue.use(httpReq)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

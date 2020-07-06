import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import '@/styles/vant.less'
import 'vant/lib/index.less'
import '@/styles/index.less'
import VueClipboard from 'vue-clipboard2'
import longpress from '@/directive/longpress'

Vue.use(Vant)
Vue.use(VueClipboard)

// 自定义vue指令
Vue.use(longpress)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

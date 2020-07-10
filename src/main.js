import StickyHeader from '@/components/stickyHeader/stickyHeader'
import longpress from '@/directive/longpress'
import '@/styles/index.less'
// import 'vant/lib/index.css'
import '@/styles/vant.less'
import Vant from 'vant'
import 'vant/lib/index.less'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Vant)
Vue.use(VueClipboard)

// 自定义vue指令
Vue.use(longpress)

Vue.component('StickyHeader', StickyHeader)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

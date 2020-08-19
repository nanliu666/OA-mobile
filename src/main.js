import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
import '@/styles/vant.less'
import '@/styles/index.less'
import 'vant/lib/index.less'
import VueClipboard from 'vue-clipboard2'
import longpress from '@/directive/longpress'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
// 日历组件
import vueHashCalendar from 'vue-hash-calendar'
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
// loadsh使用CND形式挂载在原型上
const _ = require('lodash')
Vue.prototype._ = _
Vue.use(Vant)
Vue.use(VueClipboard)

// 注册日历组件
Vue.use(vueHashCalendar)
// 自定义vue指令
Vue.use(longpress)

Vue.component('StickyHeader', StickyHeader)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

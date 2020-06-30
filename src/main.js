import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import '@/styles/vant.less'
import 'vant/lib/index.less'
import '@/styles/index.less'

Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

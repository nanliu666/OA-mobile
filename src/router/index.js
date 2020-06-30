import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes' // 页面路由
// import store from '@/store/'
// import { loginWxgzh } from '@/api/common.js'
// import { appId } from '@/config/const.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/helper/',
  // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8
  // 这个方法 是控制滚动条
  // 如果 retuen falsy || {} ,则不发生滚动
  scrollBehavior(to, from, savedPosition) {
    // savedPosition 这个参数当且仅当导航 (通过浏览器的 前进/后退 按钮触发) 时才可用  效果和 router.go() 或 router.back()
    if (savedPosition) {
      // 返回savedPosition 其实就是 当用户点击 返回的话，保持之前游览的高度
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  
  next()
})

export default router

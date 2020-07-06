import addressBook from './addressBook'
import me from './me'

export default [
  {
    path :'/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: '百利宏移动办公',
    component: () =>
      import(/* webpackChunkName: "view" */ '@/view/home/home.vue'),
    meta: { title: '百利宏移动办公' }
  },
  {
    path: '/login',
    name: '登录',
    component: () =>
      import(/* webpackChunkName: "view" */ '@/view/login/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/forget',
    name: '忘记密码',
    component: () =>
      import(/* webpackChunkName: "view" */ '@/view/login/forget.vue'),
    meta: { title: '忘记密码' }
  },
  ...addressBook,
  ...me
]

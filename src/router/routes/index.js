import addressBook from './addressBook'
import me from './me'
import work from './work'
import Layout from '@/view/Layout/Layout'

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "view" */ '@/view/login/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/forget',
    name: '忘记密码',
    component: () => import(/* webpackChunkName: "view" */ '@/view/login/forget.vue'),
    meta: { title: '忘记密码' }
  },
  {
    path: '/message',
    name: '消息',
    redirect: '/message/index',
    component: Layout,
    meta: { title: '消息' },
    children: [
      {
        path: '/message/index',
        name: '消息',
        component: () => import(/* webpackChunkName: "view" */ '@/view/message/message.vue'),
        meta: { title: '消息' }
      }
    ]
  },
  addressBook,
  me,
  work
]

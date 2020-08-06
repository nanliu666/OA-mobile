import Layout from '@/view/Layout/Layout'
import { improtAllFiles } from '@/util/util'
const routesModules = improtAllFiles(require.context('./', false, /\.js$/), '.js')
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
  ...routesModules.addressBook,
  routesModules.me,
  routesModules.work,
  routesModules.approval,
  ...routesModules.task,
  ...routesModules.todo
]

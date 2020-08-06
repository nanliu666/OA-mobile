import Layout from '@/view/Layout/Layout'
export default [
  {
    path: '/me',
    component: Layout,
    redirect: '/me/index',
    children: [
      {
        path: '/me/index',
        name: '百利宏移动办公',
        component: () => import(/* webpackChunkName: "view" */ '@/view/me/me.vue'),
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/me/feedback',
    name: '意见反馈',
    component: () => import(/* webpackChunkName: "view" */ '@/view/me/feedback.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/me/setting',
    name: '设置',
    component: () => import(/* webpackChunkName: "view" */ '@/view/me/setting.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/me/accountSafe',
    name: '账号与安全',
    component: () => import(/* webpackChunkName: "view" */ '@/view/me/accountSafe.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/me/changePhone',
    name: '修改手机号码',
    component: () => import(/* webpackChunkName: "view" */ '@/view/me/changePhone.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/me/changePassword',
    name: '修改登陆密码',
    component: () => import(/* webpackChunkName: "view" */ '@/view/me/changePassword.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/me/personalInfo',
    name: '个人信息',
    component: () => import(/* webpackChunkName: "view" */ '@/view/me/personalInfo.vue'),
    meta: { title: '个人中心' }
  }
]

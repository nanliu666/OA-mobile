import Layout from '@/view/Layout/Layout'
export default [
  {
    path: 'layout',
    component: Layout,
    children: [
      {
        path: '/message/index',
        name: '消息',
        component: () => import(/* webpackChunkName: "view" */ '@/view/message/message.vue'),
        meta: { title: '消息' }
      },
      {
        path: '/work/index',
        name: '工作',
        component: () => import(/* webpackChunkName: "view" */ '@/view/work/work.vue'),
        meta: { title: '百利宏移动办公' }
      },
      {
        path: '/me/index',
        name: '百利宏移动办公',
        component: () => import(/* webpackChunkName: "view" */ '@/view/me/me.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: '/addressBook/index',
        name: '通讯录',
        component: () =>
          import(/* webpackChunkName: "view" */ '@/view/addressBook/addressBook.vue'),
        meta: { title: '百利宏移动办公' }
      }
    ]
  }
]

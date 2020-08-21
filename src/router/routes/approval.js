export default [
  {
    path: '/approval/apprHome',
    meta: { title: '审批' },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/apprHome.vue')
  },
  {
    path: '/approval/apprList',
    meta: { title: '我发起的', keepAlive: true },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/apprList.vue')
  },
  {
    path: '/approval/apprSelect',
    meta: { title: '获取条件' },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/apprSelect.vue')
  }
]

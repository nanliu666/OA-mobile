export default [
  {
    path: '/approval/index',
    meta: { title: '审批' },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/index.vue')
  }
]

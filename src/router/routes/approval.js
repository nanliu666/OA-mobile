export default [
  {
    path: '/approval/index',
    meta: { title: '审批' },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/index.vue')
  },
  {
    path: '/approval/approDetails',
    meta: { title: '审批详情' },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/approDetails.vue')
  }
]

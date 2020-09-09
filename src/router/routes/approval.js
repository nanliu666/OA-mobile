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
  },
  {
    path: '/approval/approDetails',
    meta: { title: '审批详情' },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/approDetails.vue')
  },
  {
    path: '/approval/apprApply',
    meta: { title: '审批发起' },
    component: () => import(/* webpackChunkName: "view" */ '@/view/approval/apprApply.vue')
  }
]

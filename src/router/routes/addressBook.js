export default [
  {
    path: '/addressBook/orgDetail/:orgId',
    name: '组织详情',
    component: () => import(/* webpackChunkName: "view" */ '@/view/addressBook/orgDetail.vue'),
    meta: { title: '组织详情' }
  },
  {
    path: '/addressBook/userDetail',
    name: '员工详情',
    component: () => import(/* webpackChunkName: "view" */ '@/view/addressBook/userDetail.vue'),
    meta: { title: '员工详情' }
  },
  {
    path: '/addressBook/findOrgUser',
    name: '通讯录搜索',
    component: () => import(/* webpackChunkName: "view" */ '@/view/addressBook/findOrgUser.vue'),
    meta: { title: '通讯录搜索', keepAlive: true }
  }
]

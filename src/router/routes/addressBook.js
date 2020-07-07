import Layout from '@/view/Layout/Layout'

export default {
  path: '/addressBook',
  redirect: '/addressBook/index',
  component: Layout,
  children: [
    {
      path: '/addressBook/index',
      name: '通讯录',
      component: () => import(/* webpackChunkName: "view" */ '@/view/addressBook/addressBook.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/addressBook/findOrgUser',
      name: '通讯录搜索',
      component: () => import(/* webpackChunkName: "view" */ '@/view/addressBook/findOrgUser.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/addressBook/orgDetail/:orgId',
      name: '组织详情',
      component: () => import(/* webpackChunkName: "view" */ '@/view/addressBook/orgDetail.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/addressBook/userDetail/:userId',
      name: '员工详情',
      component: () => import(/* webpackChunkName: "view" */ '@/view/addressBook/userDetail.vue'),
      meta: { title: '百利宏移动办公' }
    }
  ]
}

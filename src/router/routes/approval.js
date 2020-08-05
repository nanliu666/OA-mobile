import Layout from '@/view/Layout/Layout'

export default {
  path: '/approval',
  component: Layout,
  redirect: '/approval/index',
  meta: { title: '审批' },
  children: [
    {
      path: '/approval/index',
      name: '审批',
      component: () => import(/* webpackChunkName: "view" */ '@/view/approval/index.vue'),
      meta: { title: '审批' }
    }
  ]
}

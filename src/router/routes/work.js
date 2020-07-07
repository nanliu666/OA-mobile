import Layout from '@/view/Layout/Layout'

export default {
  path: '/work',
  component: Layout,
  redirect: '/work/index',
  meta: { title: '百利宏移动办公' },
  children: [
    {
      path: '/work/index',
      name: '工作',
      component: () => import(/* webpackChunkName: "view" */ '@/view/work/work.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/work/todo',
      name: '待办事项',
      component: () => import(/* webpackChunkName: "view" */ '@/view/work/todo.vue'),
      meta: { title: '百利宏移动办公' }
    }
  ]
}

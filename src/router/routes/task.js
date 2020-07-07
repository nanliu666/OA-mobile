export default [
  {
    path: '/my/task',
    name: '我的任务',
    component: () => import(/* webpackChunkName: "view" */ '@/view/myTask/myTask'),
    meta: { title: '我的任务' }
  },
  {
    path: '/my/taskDetail',
    name: '我的任务',
    component: () => import(/* webpackChunkName: "view" */ '@/view/myTask/taskDetail'),
    meta: { title: '任务详情' }
  }
]

export default [
  {
    path: '/work/task',
    name: '我的任务',
    component: () => import(/* webpackChunkName: "view" */ '@/view/work/myTask/myTask'),
    meta: { title: '我的任务' }
  },
  {
    path: '/work/taskDetail',
    name: '任务详情',
    component: () => import(/* webpackChunkName: "view" */ '@/view/work/myTask/taskDetail'),
    meta: { title: '任务详情' }
  }
]

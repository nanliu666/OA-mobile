export default [
  {
    path: '/todo/recruitment',
    name: '招聘需求',
    component: () => import(/* webpackChunkName: "view" */ '@/view/work/todo/Recruitment/index'),
    meta: { title: '招聘需求' }
  },
  {
    path: '/todo/InterviewRegister',
    name: '面试登记',
    component: () =>
      import(/* webpackChunkName: "view" */ '@/view/work/todo/InterviewRegister/index'),
    meta: { title: '面试登记' }
  },
  {
    path: '/todo/entryRegister',
    name: '入职登记表',
    component: () =>
      import(/* webpackChunkName: "view" */ '@/view/work/todo/entryRegister/entryRegister'),
    meta: { title: '入职登记表' }
  },
  {
    path: '/todo/entry',
    name: '入职办理',
    component: () => import(/* webpackChunkName: "view" */ '@/view/work/todo/entry/entry'),
    meta: { title: '入职办理' }
  },
  {
    path: '/todo/orgLeave',
    name: '离职事项',
    component: () => import(/* webpackChunkName: "view" */ '@/view/work/todo/leave/orgLeaveMaster'),
    meta: { title: '离职事项' }
  },
  {
    path: '/todo/staffLeave',
    name: '离职事项',
    component: () =>
      import(/* webpackChunkName: "view" */ '@/view/work/todo/leave/staffLeaveMaster'),
    meta: { title: '离职事项' }
  },
  {
    path: '/todo/leaveHandel',
    name: '离职办理',
    component: () => import(/* webpackChunkName: "view" */ '@/view/work/todo/leave/leaveHandel'),
    meta: { title: '离职办理' }
  }
]

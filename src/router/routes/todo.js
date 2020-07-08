export default [
  {
    path: '/todo/recruitment',
    name: '招聘需求',
    component: () => import(/* webpackChunkName: "view" */ '@/view/todo/Recruitment/index'),
    meta: { title: '招聘需求' }
  },
  {
    path: '/todo/distribution',
    name: '分配招聘需求',
    component: () => import(/* webpackChunkName: "view" */ '@/view/todo/Recruitment/distribution'),
    meta: { title: '分配招聘需求' }
  },
  {
    path: '/todo/allocated',
    name: '已分配',
    component: () => import(/* webpackChunkName: "view" */ '@/view/todo/Recruitment/allocated'),
    meta: { title: '已分配' }
  },
  {
    path: '/todo/InterviewRegister',
    name: '面试登记',
    component: () => import(/* webpackChunkName: "view" */ '@/view/todo/InterviewRegister/index'),
    meta: { title: '面试登记' }
  }
]

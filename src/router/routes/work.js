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
    },
    {
      path: '/work/resumeDetail',
      name: '简历审核',
      component: () => import(/* webpackChunkName: "view" */ '@/view/work/resume/resumeDetail.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/work/passResume',
      name: '通过简历',
      component: () => import(/* webpackChunkName: "view" */ '@/view/work/resume/passResume.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/work/rejectResume',
      name: '淘汰简历',
      component: () => import(/* webpackChunkName: "view" */ '@/view/work/resume/rejectResume.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/work/interviewDetail',
      name: '面试人员详情',
      component: () =>
        import(/* webpackChunkName: "view" */ '@/view/work/interview/interviewDetail.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/work/interviewEvaluation',
      name: '面试详情评价',
      component: () =>
        import(/* webpackChunkName: "view" */ '@/view/work/interview/interviewEvaluation.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/todo/allotRecruitment',
      name: '分配招聘需求',
      component: () =>
        import(/* webpackChunkName: "view" */ '@/view/work/todo/allotRecruitment.vue'),
      meta: { title: '百利宏移动办公' }
    },
    {
      path: '/todaySchedule/calendar',
      name: '今日安排',
      component: () =>
        import(/* webpackChunkName: "view" */ '@/view/work/todaySchedule/calendar.vue'),
      meta: { title: '工作台' }
    },
    {
      path: '/todaySchedule/calendar/info',
      name: '提醒事项',
      component: () =>
        import(/* webpackChunkName: "view" */ '@/view/work/todaySchedule/scheduleInfo.vue'),
      meta: { title: '工作台' }
    }
  ]
}

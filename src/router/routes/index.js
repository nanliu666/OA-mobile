import { improtAllFiles } from '@/util/util'
const routesModules = improtAllFiles(require.context('./', false, /\.js$/), '.js')
export default [
  {
    path: '/',
    redirect: '/login'
  },
  ...routesModules.addressBook,
  ...routesModules.tabbar,
  ...routesModules.me,
  ...routesModules.work,
  ...routesModules.approval,
  ...routesModules.task,
  ...routesModules.todo
]

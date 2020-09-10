import { improtAllFiles } from '@/util/util'
const mockModules = improtAllFiles(require.context('./', false, /\.js$/), '.js')
const options = { mock: false }
mockModules.user(options)
mockModules.message(options)
mockModules.metask(options)
mockModules.todo(options)
mockModules.work(options)
mockModules.approval({ mock: false })

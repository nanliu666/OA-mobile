import user from './user.js'
import message from './message.js'
import metask from './metask'
import todo from './todo'
import work from './work'
// import Mock from 'mockjs'

// Mock.setup({
//     timeout: 2000
// })
user({ mock: true })
message({ mock: true })
metask({ mock: true })
todo({ mock: true })
work({ mock: true })

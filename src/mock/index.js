import user from './user.js'
import message from './message.js'
import metask from './metask'
import todo from './todo'
import work from './work'
// import Mock from 'mockjs'

// Mock.setup({
//     timeout: 2000
// })
user({ mock: false })
message({ mock: false })
metask({ mock: false })
todo({ mock: false })
work({ mock: false })

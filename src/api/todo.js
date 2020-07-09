import { get, post } from '@/util/request'
// 招聘任务查询接口

export const queryDistribution = (params) => {
  return get('/user/v1/recruitment/task', { ...params })
}
// 人员信息查询
export const getpersonInfo = (params) => get('/helper/v1/person/info', params)

// 待入职人员详情
export const getCandidateAcceptDetail = (params) => {
  return get('/api/user/v1/candidate/accept/detail', params)
}
// 员工离职交接事项查询接口

export const getLeaveNote = (params) => {
  return get('/user/v1/user/leave/note', params)
}
// 员工离职交接事项确认
export const postConfirmleaveNote = (params) => {
  return post('/user/v1/user/leave/note/confirm', params)
}
// 员工离职交接事项催一下接口
export const postUrgeleaveNote = (params) => {
  return post('/user/v1/user/leave/note/urge', params)
}

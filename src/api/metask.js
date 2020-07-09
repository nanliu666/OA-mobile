import { get } from '@/util/request'
// 任务中心查询接口
export const fetchTaskList = (params) => {
  return get('/task/v1/task/center/list', params)
}
//招聘需求申请详情查询

export const getRecruitmentDetail = (params) => {
  return get('/user/v1/recruitment/detail', params)
}

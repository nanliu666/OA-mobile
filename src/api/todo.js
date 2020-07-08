import { get } from '@/util/request'
// 招聘任务查询接口

export const queryDistribution = (params) => {
  return get('/user/v1/recruitment/task', { ...params })
}
export const getpersonInfo = (params) => get('/helper/v1/person/info', params)

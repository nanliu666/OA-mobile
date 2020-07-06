import { get } from '@/util/request'

/**
 * 组织架构员工查询接口
 * @param {Object} params
 * */
export const getOrgUserTree = (params) => {
    return get('/user/v1/user/address/book', params)
  }
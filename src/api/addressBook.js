import { get } from '@/util/request'

/**
 * 通讯录部门查询接口
 * @param {Object} params = {parentOrgId: '', orgName: ''}
 * */
export const getAddressOrg = (params) => {
  return get('/user/v1/user/address/book/org', params)
}
/**
 * 通讯录员工查询接口
 * @param {Object} params
 * */
export const getAddressuser = (params) => {
  return get('/user/v1/user/address/book/user', params)
}

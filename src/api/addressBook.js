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
/**
 * 组织架构员工查询接口
 */
export const getOrgUserTree = () => {
  // 需要更换接口 /org/v1/org/user/child
  return get('/org/v1/org/user/tree')
}

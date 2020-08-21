import { get } from '@/util/request'
/**
 * 组织机构查询
 */
export const getOrgTreeSimple = (params) => get('/org/v1/organization/tree', params)

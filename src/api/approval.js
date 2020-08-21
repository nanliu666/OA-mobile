import { get } from '@/util/request'
/**
 * 审批流程查询接口
 * @param {Object} params - 参数
 * @param {String} params.processId - 流程ID
 * */
export const getProcessDetail = (params) => get('/appr/v2/appr/process', params)
/**
 * 审批流程列表查询接口
 * @param {*} params
 */
export const getProcessList = (params) => get('/appr/v2/appr/process/list', params)
/**
 * 我发起的审批查询接口
 * @param {*} params
 */
export const getMyApproveList = (params) => get('/appr/v2/appr/my/approve/list', params)
/**
 * 待我审批查询接口
 * @param {*} params
 */
export const getWaitApproveList = (params) => get('/appr/v2/appr/wait/approve/list', params)
/**
 * 我已审批查询接口
 * @param {*} params
 */
export const getHasApproveList = (params) => get('/appr/v2/appr/has/approve/list', params)
/**
 * 抄送我的审批查询接口
 * @param {*} params
 */
export const getCopyApproveList = (params) => get('/appr/v2/appr/cc/approve/list', params)
/**
 * 审批类型查询接口
 */
export const getProcessTypeList = (params) => get('/appr/v2/appr/process/type', params)
export const getApplyDetail = (params) => get('/api/appr/v2/appr/process/apply/detail', params)
export const getApplyRecord = (params) => get('/api/appr/v2/appr/apply/record', params)

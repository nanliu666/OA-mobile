import { get, post } from '@/util/request'
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

/**
 * 审批申请提交接口
 * */
export const submitApprApply = (params) => post('/appr/v2/appr/apply/submit', params)
/**
 *
 * 发起人所在部门查询接口
 * @param {object} params 查询参数
 * @param {string} params.userId
 */
export const getUserOrgList = (params) => get('/appr/v2/appr/user/org/list', params)

/**
 *
 * 根据formKey查询流程ID接口
 * @param {object} params 查询参数
 * @param {string} params.formKey
 */
export const getProcessIDByFormKey = (params) => get('/appr/v2/appr/process/id', params)

/**
 * 发起人指定职位查询接口
 * @param {object} params
 * @param {string} params.id 职位id
 */
export const getUserByJob = (params) => get('/appr/v2/appr/user/job', params)

/**
 * 发起人指定岗位查询接口
 * @param {object} params
 * @param {string} params.id 岗位id
 */
export const getUserByPosition = (params) => get('/appr/v2/appr/user/position', params)

/**
 * 发起人指定标签查询接口
 * @param {object} params
 * @param {string} params.id 标签id
 */
export const getUserByTag = (params) => get('/appr/v2/appr/user/tag', params)

/**
 * 发起人上级领导查询接口
 * @param {object} params
 * @param {string} params.userId 发起人的用户id
 * @param {string} params.level 上级领导层级，对应字典组：ManageLevel
 */
export const getUserLeader = (params) => get('/appr/v2/appr/user/leader', params)

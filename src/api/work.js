import { get, post, del } from '@/util/request'

/**
 * 待办任务查询接口
 * @param {Object} params
 * */
export const getTodoList = (params) => {
  return get('/user/v1/todo/list', params)
}
/**
 * 审批申请催一下接口
 * @param {Object} params
 * */
export const urgeApply = (params) => {
  return post('/appr/v1/appr/apply/urge', params)
}
/**
 * 提醒事项查询接口
 * @param {Object} params
 * */
export const getScheduleList = (params) => {
  return get('/schedule/v1/schedule/info', params)
}

/**
 * 我发起的审批查询接口
 * @param {Object} params
 * */
export const getMyApproveList = (params) => {
  return post('/appr/v1/appr/my/approve/list', params)
}

/**
 * 候选人简历审核详情查询接口
 * @param {Object} params
 * */
export const getResumeCheck = (params) => {
  return get('/user/v1/person/resume/check', params)
}

/**
 * 候选人人员详情查询接口
 * @param {Object} params
 * */
export const getPersonInfo = (params) => {
  return get('/user/v1/person/info', params)
}

/**
 * 招聘需求详情查询接口
 * @param {Object} params
 * */
export const getRecruitmentDetail = (params) => {
  return get('/user/v1/recruitment/detail', params)
}

/**
 * 候选人简历审核通过接口
 * @param {Object} params
 * */
export const passResume = (params) => {
  return post('/user/v1/person/resume/pass', params)
}

/**
 * 候选人简历审核淘汰接口
 * @param {Object} params
 * */
export const rejectResume = (params) => {
  return post('/user/v1/person/resume/reject', params)
}

/**
 * 候选人面试详情查询接口
 * @param {Object} params
 * */
export const getInterviewInfo = (params) => {
  return get('/user/v1/person/interview/info', params)
}

/**
 * 候选人面试详情评价提交接口
 * @param {Object} params
 * */
export const postInterviewEvaluation = (params) => {
  return post('/user/v1/person/interview/info', params)
}

/**
 * 在职员工查询接口
 * @param {Object} params
 * */
export const getWorkList = (params) => {
  return get('/user/v1/user/work/list', params)
}

/**
 * 招聘任务分配接口
 * @param {Object} params
 * */
export const postRecruitmentTask = (params) => {
  return post('/user/v1/recruitment/task', params)
}

/**
 * 提醒事项查询接口
 * @param {Object} params
 * */
export const getScheduleInfo = (params) => {
  return get('/schedule/v1/schedule/info', params)
}

/**
 * 提醒事项添加接口
 * @param {Object} params
 * */
export const createScheduleInfo = (params) => {
  return post('/schedule/v1/schedule/info', params)
}

/**
 * 提醒事项删除接口
 * @param {Object} params
 * */
export const deleteScheduleInfo = (params) => {
  return del('/schedule/v1/schedule/info', params)
}

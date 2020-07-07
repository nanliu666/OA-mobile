import { get } from '@/util/request'

/**
 * 待办任务查询接口
 * @param {Object} params
 * */
export const getTodoList = (params) => {
    return get('/task/v1/todo/list', params)
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
    return get('/appr/v1/appr/my/approve/list', params)
  }
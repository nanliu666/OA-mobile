import { get, post } from '@/util/request'

/**
 * 消息列表查询接口
 * @param {Object} params
 * */
export const getMsgNotifyList = (params) => {
    return get('/msg/v1/msg/notify/list', params)
  }

  /**
 * 消息已读提交接口
 * @param {Object} params
 * */
export const readMsgNotify = (params) => {
    return post('/msg/v1/msg/notify/read', params)
  }
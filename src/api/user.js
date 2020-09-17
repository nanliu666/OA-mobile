import { get, post, put, del } from '@/util/request'

/**
 * 获取图片验证码接口
 * @param {Object} params
 * */
export const getOauthCaptcha = (params) => {
  return get('/blade-auth/oauth/captcha', params)
}

/**
 * 用户手机号修改接口
 * @param {Object} params
 * */
export const modifyUserPhone = (params) => {
  return post('/user/v1/user/phone', params)
}

/**
 * 用户登录接口
 * @param {Object} params
 * */
export const userLogin = (params) => {
  return post('/blade-auth/oauth/token', params)
}

/**
 * 短信验证码下发接口
 * @param {Object} params
 * */
export const sendSms = (params) => {
  return post('/common/v1/sms/send', params)
}

/**
 * 短信验证码校验接口
 * @param {Object} params
 * */
export const checkPhoneSms = (params) => {
  return post('/common/v1/sms/check', params)
}

/**
 * 用户密码修改接口
 * @param {Object} params
 * */
export const changePassword = (params) => {
  return post('/user/v1/user/pwd', params)
}

/**
 * 员工信息查询接口
 * @param {Object} params
 * */
export const getUserInfo = (params) => {
  return get('/user/v1/user/info', params)
}

/**
 * 员工信息编辑接口
 * @param {Object} params
 * */
export const modifyUserInfo = (params) => {
  return put('/user/v1/user/info', params)
}

/**
 * 用户意见反馈提交接口
 * @param {Object} params
 * */
export const postUserFeedback = (params) => {
  return post('/user/v1/user/feedback', params)
}

/**
 * 员工紧急联系人查询接口
 * @param {Object} params
 * */
export const getUserEmerInfo = (params) => {
  return get('/user/v1/user/emer/info', params)
}

/**
 * 员工紧急联系人编辑接口
 * @param {Object} params
 * */
export const modifyUserEmerInfo = (params) => {
  return put('/user/v1/user/emer/info', params)
}

/**
 * 员工紧急联系人添加接口
 * @param {Object} params
 * */
export const createUserEmerInfo = (params) => {
  return post('/user/v1/user/emer/info', params)
}

/**
 * 员工紧急联系人删除接口
 * @param {Object} params
 * */
export const deleteUserEmerInfo = (params) => {
  return del('/user/v1/user/emer/info', params)
}

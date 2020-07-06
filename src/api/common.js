import { get } from '@/util/request'
/**
 * 七牛云上传凭证获取接口
 * @param {Object} params
 * */
export const getQiniuToken = (params) => {
  return get('/api/common/v1/upload/token', params)
}

/**
 * 字典code查询接口
 * @param {Object} params
 * */
export const getDict = (params) => {
  return get('/blade-system/v1/dict/code', params)
}

/**
 * 获取域名信息接口
 * @param {Object} params
 * */
export const getTenantId = (params) => {
  return get('/sys/v1/domain/info', params)
}

/**
 * 材料附件分类查询接口
 * @param {Object} params
 * */
export const getAttachmentCategory = (params) => {
  return get('/user/v1/user/attachment/category', params)
}




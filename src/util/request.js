/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import router from '@/router/'
import store from '@/store/'
import { getToken } from '@/util/auth'
import { Toast, Dialog } from 'vant'
import { client } from '@/config/const'
import { Base64 } from 'js-base64'

let loadingToast = null
let loadingCount = 0
let DialogCount = 0
/**
 * 每请求一次loading，增加一次次数
 */
function addLoading() {
  loadingCount++
  if (!loadingToast) {
    loadingToast = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
  }
}
/**
 *  每请求完成一次loading，减少一次次数
 */
function reduceLoading() {
  loadingCount--
  if (loadingCount == 0) {
    closeLoading()
  }
}
/**
 * 关闭loading
 */
function closeLoading() {
  loadingToast && loadingToast.clear()
  loadingToast = null
}
const instance = axios.create({
  timeout: 100000, //默认超时时间
  withCredentials: true, //跨域请求，允许保存cookie
  validateStatus: function(status) {
    return status >= 200 && status <= 500
  }
})

//http request拦截
instance.interceptors.request.use(
  (config) => {
    const meta = config.meta || {}
    const isToken = meta.isToken === false
    config.headers['Tenant-Id'] = store.state.user.userInfo.tenantId || ''
    // config.headers.appId = 'OAMobile'
    config.headers.appId = 'Admin'
    const tokenType = store.state.user.userInfo.token_type || ''
    const accessToken = store.state.user.userInfo.access_token || ''
    config.headers.accessToken = tokenType + ' ' + accessToken
    config.headers['Authorization'] = `Basic ${Base64.encode(
      `${client.clientId}:${client.client_secret}`
    )}`
    if (!config.url.startsWith('/api') && !config.url.startsWith('api')) {
      config.url = '/api' + config.url
    }
    if (getToken() && !isToken) {
      //让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
      config.headers.accessToken = 'bearer' + ' ' + getToken()
    }
    if (
      config.method.toLowerCase() === 'post' &&
      String.prototype.endsWith.call(config.url, '/oauth/token')
    ) {
      config.params = config.data
      config.headers['Tenant-Id'] = config.data.tenantId
      config.headers['Captcha-Key'] = config.data.key
      config.headers['Captcha-Code'] = config.data.code
    }
    addLoading()
    return config
  },
  (error) => {
    closeLoading()
    return Promise.reject(error)
  }
)
/**
 * 多设备登录
 * @param {*} message 后端返回信息
 */
function redirectLogin(message) {
  reduceLoading()
  if (DialogCount > 0) return
  closeLoading()
  DialogCount++
  Dialog.alert({
    title: '提示',
    message,
    confirmButtonText: '重新登录'
  }).then(() => {
    router.push({ path: '/login' })
    DialogCount = 0
  })
}
//http response 拦截
instance.interceptors.response.use(
  (res) => {
    //获取状态码
    const status = res.data.resCode || res.status
    let message = res.data.resMsg || res.data.error_description || '网络错误'
    //如果是401则跳转到登录页面
    if (status === 401) {
      router.push({ path: '/login' })
      message = '授权失败'
    }
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      if (status === 8000) {
        redirectLogin(message)
      } else {
        Toast({ message })
        return Promise.reject(new Error(message))
      }
    } else {
      reduceLoading()
    }
    if (String.prototype.endsWith.call(res.config.url, '/oauth/token')) {
      return res.data
    }
    return res.data.response
  },
  (error) => {
    closeLoading()
    return Promise.reject(new Error(error))
  }
)

export function post(urls, data, config = {}) {
  return instance.post(urls, data, config)
}

export function get(urls, params, config = {}) {
  return instance.get(urls, {
    params,
    ...config
  })
}

export function put(urls, data, config = {}) {
  return instance.put(urls, data, config)
}

export function del(urls, data, config = {}) {
  return instance.delete(urls, {
    params: data,
    data,
    ...config
  })
}

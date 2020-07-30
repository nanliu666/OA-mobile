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
import { Toast } from 'vant'
import { client } from '@/config/const'
import { Base64 } from 'js-base64'

let loadingToast = null

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
    // 展示全局loading
    if (config.showLoading && !loadingToast) {
      loadingToast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
    }
    return config
  },
  (error) => {
    loadingToast && loadingToast.clear()
    loadingToast = null
    return Promise.reject(error)
  }
)
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
    loadingToast && loadingToast.clear()
    loadingToast = null
    if (status !== 200) {
      Toast({ message })
      return Promise.reject(new Error(message))
    }
    if (String.prototype.endsWith.call(res.config.url, '/oauth/token')) {
      return res.data
    }
    return res.data.response
  },
  (error) => {
    loadingToast && loadingToast.clear()
    loadingToast = null
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

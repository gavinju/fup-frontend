import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // console.log('我要发请求啦', config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 请求成功，返回数据。
    const code = response.data.code

    // 强制登录
    // if (code === 40100 && window.location.pathname !== '/user/login') {
    //   // 跳转到登录页面
    //   window.location.href = `/user/login?redirect=${window.location.href}`
    //   // throw new Error('请先登录')
    // }

    if (code !== 0) {
      // throw new Error(response.data.message ?? '服务器错误')
      if (code === 40400) {
        window.location.href = `/404`
      }
      if (code === 40300) {
        window.location.href = `/403`
      }
    }

    return response.data
    // 请求失败，返回错误信息
    // console.error('request error', response)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    return Promise.reject(error)
  },
)

/**
 * get请求
 * @param url 请求地址
 * @param params 请求参数
 */
export function getRequest(url, params) {
  return instance({
    method: 'GET',
    url: `${url}`,
    params: params,
  })
}

/**
 * post请求
 * @param url 请求地址
 * @param data 请求数据
 * @returns {Promise}
 */
export function postRequest(url, data) {
  return instance({
    method: 'POST',
    url: `${url}`,
    data,
  })
}

export const fileRequest = (url) => {
  return instance({
    method: 'GET',
    url: `${url}`,
    responseType: 'blob',
  })
}

// 下载文件函数
export const downloadFile = (data, fileName) => {
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default instance

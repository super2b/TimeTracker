import axios from 'axios'
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = '连接到服务器失败'
  }
  return Promise.resolve(error.response)
})

function getCookie (name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) {
    return match[2]
  } else {
    return null
  }
}

axios.defaults.baseURL = 'http://localhost:7001'
axios.defaults.headers.common['Authorization'] = 'bearer ' + getCookie('userToken')
axios.defaults.timeout = 10000

export default {
  // http get请求
  async get (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: params
      }).then(res => {
        resolve(res)
      })
    })
  },
  // http post 请求
  async post (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: params
      }).then(res => {
        resolve(res)
      })
    })
  },
  refreshUserToken () {
    console.log('executed refreshUserToken.....')
    axios.defaults.headers.common['Authorization'] = 'bearer ' + getCookie('userToken')
  }
}

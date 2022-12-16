import axios from 'axios'
import { baseUrl } from '../api/index'
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css' // 这个nprogress样式必须引入
const axiosInstance = axios.create({
  baseURL: baseUrl,
})
// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    NProgress.start()
    return config
  },
  (err) => {
    console.log(err)
  }
)
// 响应拦截器, 直接返回data
axiosInstance.interceptors.response.use(
  (res) => {
    NProgress.done()
    return res.data
  },
  (err) => {
    console.log(err)
  }
)
export { axiosInstance }

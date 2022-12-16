import { axiosInstance } from '../config/index'

// 获取中餐及首页API
export const getIndexFood = () => {
  return axiosInstance.get('/getIndexFood')
}
// 获取西餐数据API
export const getWesternFood = () => {
  return axiosInstance.get('/getWesternFood')
}

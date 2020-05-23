import * as actionTypes from './constants'
import { getIndexFood, getWesternFood } from '../../../utils/request'
const changeFood = (data) => ({
  type: actionTypes.GETINDEXFOOD,
  data,
})
const changeWesternFood = (data) => ({
  type: actionTypes.GETXICAN,
  data,
})
const changeCHINAFOOD = (data) => ({
  type: actionTypes.GETCHINAFOOD,
  data,
})
const changeCurPage = (data) => ({
  type: actionTypes.CHANGECURRENTPAGE,
  data,
})
export const changeLoading = (data) => ({
  type: actionTypes.CHANGELOADING,
  data,
})

export const changeCartDataDiaptch = (data) => ({
  type: actionTypes.CHANGECARTDATA,
  data,
})
export const changeCartDataFromCartPage = (data) => ({
  type: actionTypes.CHANGECARTDATAFROMCARTPAGE,
  data,
})
export const deleteCartItemDispatch = (data) => ({
  type: actionTypes.DELETECARTITEM,
  data,
})
// 获取中餐以及首页数据
export const getIndexData = (curPage) => {
  return (dispatch) => {
    getIndexFood().then((res) => {
      dispatch(changeFood(res))
      dispatch(changeLoading(false))
      dispatch(changeCHINAFOOD(res))
      dispatch(changeCurPage(curPage))
    })
  }
}
// 获取西餐数据
export const getWesternFoodData = (curPage) => {
  return (dispatch) => {
    getWesternFood().then((res) => {
      dispatch(changeWesternFood(res))
      dispatch(changeFood(res))
      dispatch(changeLoading(false))
      dispatch(changeCurPage(curPage))
    })
  }
}

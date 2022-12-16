import {
  GETFASHI,
  GETINDEXFOOD,
  GETTIANDIAN,
  GETXICAN,
  CHANGELOADING,
  GETCHINAFOOD,
  CHANGECURRENTPAGE,
  CHANGECARTDATA,
  CHANGECARTDATAFROMCARTPAGE,
  DELETECARTITEM,
} from './constants'

let defaultState = {
  food: [],
  CartFood: [], //购物车数据
  WesternFood: [], //西餐数据
  DessertFood: [], // 甜点数据
  FrenchFood: [], // 法式数据
  ChinaFood: [], // 中餐数据
  loading: false,
  currentPage: null,
}
// 在购物车页面更新商品数量
const changeCartDataFromCart = (state, data) => {
  // 深拷贝一份新的store数据
  const newData = JSON.parse(JSON.stringify(state))
  newData.CartFood = [...data]

  return newData
}
// 删除购物车一项
const deleteCartItem = (state, data) => {
  // 先深度拷贝一份新的store数据
  const newData = JSON.parse(JSON.stringify(state))
  // 删除一项
  newData.CartFood.splice(data, 1)
  return newData
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case GETINDEXFOOD:
      return { ...state, food: action.data }
    case GETXICAN:
      return { ...state, WesternFood: action.data }
    case GETTIANDIAN:
      return { ...state, DessertFood: action.data }
    case GETFASHI:
      return { ...state, FrenchFood: action.data }
    case CHANGELOADING:
      return { ...state, loading: action.data }
    case GETCHINAFOOD:
      return { ...state, ChinaFood: action.data }
    case CHANGECURRENTPAGE:
      return { ...state, currentPage: action.data }
    case CHANGECARTDATA:
      return { ...state, CartFood: action.data }
    case CHANGECARTDATAFROMCARTPAGE:
      return changeCartDataFromCart(state, action.data)
    case DELETECARTITEM:
      return deleteCartItem(state, action.data)
    default:
      return state
  }
}

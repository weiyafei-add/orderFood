// 导入创建仓库的函数,会使用到中间件
import { createStore, compose, applyMiddleware } from 'redux'
// 导入时间旅行中间件
import { createLogger } from 'redux-logger'
// 导入根reducer
import rootReducer from './reducer'
// 导入thunk中间件
import thunk from 'redux-thunk'
const logger = createLogger()
const middleware = [logger, thunk]

const composeEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhance(applyMiddleware(...middleware))
)

export default store

import React from 'react'
import { renderRoutes } from 'react-router-config'
import router from './route'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(router)}</HashRouter>
    </Provider>
  )
}

export default App

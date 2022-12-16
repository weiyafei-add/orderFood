import React from 'react'
import { Redirect } from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import Cart from '../components/Cart'

export default [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/cart',
    component: Cart,
    exact: true,
  },
  {
    path: '/',
    component: Home,
    routers: [
      {
        path: '/home',
        exact: true,
        render: () => <Redirect to={'/'}></Redirect>,
      },
    ],
  },
]

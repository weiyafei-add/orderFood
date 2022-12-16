import React, { useState } from 'react'
import { Button, Avatar, Input, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import './index.css'
import axios from 'axios'
import { baseUrl } from '../../utils/api/index'
function Login(props) {
  const [username, setUserName] = useState('admin')
  const [password, setPassWord] = useState('admin')
  const [isSubmit, setIsSubmit] = useState(false)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (username === '' || password === '') {
      return message.error('账号或密码不能为空')
    }
    setIsSubmit(true)
    console.log(username, password)
    let userData = {
      username,
      password,
    }
    axios({
      method: 'POST',
      url: baseUrl + '/login',
      data: userData,
      withCredentials: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((res) => {
      let { data } = res
      if (data.data !== 'ok') {
        setIsSubmit(false)
        localStorage.removeItem('FOODopenId')
        return message.error('账号或密码错误')
      }
      localStorage.setItem('FOODopenId', data.openId)
      message.success('登录成功')
      props.history.push('/')
    })
  }

  return (
    <div className="login_container">
      <div className="login_box">
        <Avatar className="avatar" size={100} icon={<UserOutlined />} />
        <div className="form">
          <form method="post">
            <Input
              className="userName"
              name="username"
              size="large"
              placeholder="请输入您的账号"
              prefix={<UserOutlined />}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input.Password
              name="password"
              size="large"
              placeholder="请输入您的密码"
              prefix={<KeyOutlined />}
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <Button
              disabled={isSubmit}
              type="primary"
              htmlType="submit"
              onClick={handleOnSubmit}
              loading={isSubmit}
              className="btn"
            >
              登录
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login

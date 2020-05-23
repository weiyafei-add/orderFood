import React, { useCallback, useState } from 'react'
import { CartHeader, CartContainer, CartContent } from './style'
import avatrtUrl from '../../assets/avatar.png'
import { Button, Menu, Empty, List, Divider, InputNumber, Modal } from 'antd'
import {
  changeCartDataFromCartPage,
  deleteCartItemDispatch,
} from '../Home/store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { ExclamationCircleOutlined } from '@ant-design/icons'
// 导入图片预览组件
import { RViewer, RViewerTrigger } from 'react-viewerjs'

const { confirm } = Modal
const Cart = (props) => {
  const disaptch = useDispatch()
  const cartData = useSelector((state) => state.homeReducer.CartFood)
  const [showImg, setShowImg] = useState(false)
  // 数字输入框回调
  const onCartInputNumChange = (value, index) => {
    console.log(value, index)
    let cartDataKey = Object.keys(cartData[index])
    cartData[index][cartDataKey].count = value
    cartData[index][cartDataKey].priceTotal =
      value * cartData[index][cartDataKey].price
    /***
     *
     *
     * 未完成购物车价格变化
     *
     *
     */

    disaptch(changeCartDataFromCartPage(cartData))
  }
  // 删除一项数据
  function showDeleteConfirm(index, name) {
    confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: `您确认要删除  ${name}  吗?`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log(index)
        disaptch(deleteCartItemDispatch(index))
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  // 计算总价格
  const allPriceTotal = (cartData) => {
    let total = 0
    cartData.forEach((item) => {
      let key = Object.keys(item)
      total += item[key].priceTotal
    })
    return total
  }
  // 预览图片
  const options = {
    toolbar: {
      //单张图片预览不要pre和next底部按钮，隐藏它
      prev: false,
      next: false,
    },
  }

  const renderCartList = useCallback((cartList) => {
    return (
      <>
        <Divider orientation="left">越努力,越幸运!</Divider>
        <List
          size="large"
          header={
            <div className="cartHeader">
              <span>购物车</span>
              <span>菜名</span>
              <span>数量</span>
              <span>总计</span>
              <span>操作</span>
            </div>
          }
          footer={
            <>
              <div>
                您此次的订单总金额为:{' '}
                <span
                  style={{
                    color: 'red',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                  }}
                >
                  {allPriceTotal(cartList)}
                </span>{' '}
              </div>
              <div>
                <Button type="primary">提交订单</Button>
              </div>
            </>
          }
          bordered
          dataSource={cartList}
          renderItem={(item, index) => (
            <List.Item>
              <div className="cartFoodItem">
                <div className="imgBox">
                  <RViewer
                    options={options}
                    imageUrls={item[Object.keys(item)].imgUrl}
                  >
                    <RViewerTrigger>
                      <img src={item[Object.keys(item)].imgUrl}></img>
                    </RViewerTrigger>
                  </RViewer>
                </div>
                <div className="foodName">
                  <span>{Object.keys(item)}</span>
                </div>
                <div className="inputBox">
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={item[Object.keys(item)].count}
                    onChange={(value) => onCartInputNumChange(value, index)}
                  />
                </div>
                <div className="priceCount">
                  <span>{item[Object.keys(item)].priceTotal}</span>
                </div>
                <div className="operating">
                  <Button
                    type="primary"
                    danger
                    onClick={() => showDeleteConfirm(index, Object.keys(item))}
                  >
                    删除
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        />
      </>
    )
  })

  return (
    <CartContainer>
      <CartHeader>
        <div className="avatar">
          <img src={avatrtUrl} alt="头像"></img>
        </div>
        <div className="backBox">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => props.history.push('/')}>
              返回继续购物
            </Menu.Item>
          </Menu>
        </div>
      </CartHeader>

      {/* 中间区域 */}
      {cartData.length <= 0 ? (
        <div className="cartNoData">
          <Empty description="什么?还没有添加商品?"></Empty>
          <Button
            className="cartNoDataBtn"
            type="primary"
            onClick={() => props.history.push('/')}
          >
            返回继续购物
          </Button>
        </div>
      ) : (
        <CartContent>{renderCartList(cartData)}</CartContent>
      )}
    </CartContainer>
  )
}

export default React.memo(Cart)

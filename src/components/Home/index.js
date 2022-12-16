import React, { useEffect, useState } from 'react'
import {
  Layout,
  Menu,
  Card,
  Modal,
  InputNumber,
  Button,
  message,
  Spin,
  Tooltip,
  Badge,
} from 'antd'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  getIndexData,
  getWesternFoodData,
  changeLoading,
  changeCartDataDiaptch,
} from './store/actionCreators'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { CSSTransition } from 'react-transition-group'
// 导入购物车页面
const { Content, Footer, Header } = Layout
const { Meta } = Card
const { confirm } = Modal
function Home(props) {
  const [foodCountArr, setFoodCountArr] = useState([])
  const [showStatus, setShowStates] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    // 检查是否已经登录
    try {
      if (!localStorage.getItem('FOODopenId')) {
        props.history.push('/login')
      }
    } catch (error) {}
    // 进入页面获取后台数据
    // const getIndexFood = async () => {
    //   const res = await axios({
    //     method: 'GET',
    //     url: baseUrl + '/getIndexFood',
    //     withCredentials: true,
    //   })
    //   console.log(res)
    //   if (res.status !== 200) {
    //     return message.error('获取首页数据失败')
    //   }
    //   const { data } = res
    //   setFood(data)
    // }
    // getIndexFood()
    dispatch(changeLoading(true))
    dispatch(getIndexData())
    // eslint-disable-next-line
  }, [])
  // 获取仓库数据
  const storeFood = useSelector((state) => state.homeReducer.food)
  const isLoading = useSelector((state) => state.homeReducer.loading)
  const westernFood = useSelector((state) => state.homeReducer.WesternFood)
  const chinaFood = useSelector((state) => state.homeReducer.ChinaFood)
  const curPage = useSelector((state) => state.homeReducer.currentPage)
  const cartData = useSelector((state) => state.homeReducer.CartFood)
  let foodCountTotal = [...cartData]
  // 数字输入的回调
  const onInputNumChange = (value, name, imgUrl, price) => {
    // count:value; 对象中count值为value
    if (foodCountTotal.length === 0) {
      let obj = {}
      obj[name] = { count: value, imgUrl, price, priceTotal: price * value }
      foodCountTotal.push(obj)
      return
    }
    // 遍历数组, 看是否有相同的菜名
    for (let i = 0; i < foodCountTotal.length; i++) {
      if (Object.keys(foodCountTotal[i]).toString() !== name) {
        // 如果找到数组最后一项都未找到, 就直接添加
        if (i === foodCountTotal.length - 1) {
          let obj = {}
          obj[name] = { count: value, imgUrl, price, priceTotal: price * value }
          foodCountTotal.push(obj)
          return
        }
        continue
      } else {
        foodCountTotal[i][name].count = value
        foodCountTotal[i][name].priceTotal = value * price
        console.log('查看更改后的数据', foodCountTotal)
        // 如果数量为0, 则删除这一项
        foodCountTotal.forEach((item, index) => {
          // 获取key值
          if (item[Object.keys(item).toString()] === 0) {
            foodCountTotal.splice(index, 1)
          }
        })
        return
      }
    }
  }
  // 添加到购物车
  const addToCart = () => {
    if (foodCountTotal.length === 0) {
      return message.info('似乎还没有选中任何一道菜哦')
    }
    // 同步购物车数据到redux
    dispatch(changeCartDataDiaptch(foodCountTotal))
    setFoodCountArr(foodCountTotal)
    message.success('更新购物车成功')
  }
  // 获取默认选中的值
  const renderValue = (foodName, cartData) => {
    if (cartData.length === 0) return 0
    for (let i = 0; i < cartData.length; i++) {
      let key = Object.keys(cartData[i]).toString()
      if (foodName !== key) {
        continue
      } else {
        return cartData[i][key].count
      }
    }
  }
  // render商品卡片
  const renderCard = () => {
    return (
      <div className="site-layout-background">
        {storeFood.map((item, index) => {
          return (
            <CSSTransition
              in={showStatus}
              classNames={'fly'}
              timeout={400}
              appear={true}
              unmountOnExit
              key={index}
            >
              <Card
                key={item.id}
                style={{ width: 250 }}
                cover={
                  <>
                    <img alt="example" className="foodImg" src={item.imgUrl} />
                    <div className="querySimilar">找相似</div>
                  </>
                }
                actions={[
                  <InputNumber
                    min={0}
                    max={100}
                    defaultValue={
                      renderValue(item.foodName, cartData) > 0
                        ? renderValue(item.foodName, cartData)
                        : 0
                    }
                    onChange={(value) =>
                      onInputNumChange(
                        value,
                        item.foodName,
                        item.imgUrl,
                        item.price
                      )
                    }
                  />,
                  <Button type="primary" size="middle" onClick={addToCart}>
                    添加到购物车
                  </Button>,
                ]}
              >
                <Tooltip placement="bottom" title={item.desc}>
                  <Meta
                    title={item.foodName}
                    description={item.desc ? item.desc : '暂无描述信息'}
                  />
                </Tooltip>
                <div className="priceBox">
                  <span className="price">{item.price}</span>
                  <span>元/例</span>
                </div>
              </Card>
            </CSSTransition>
          )
        })}
      </div>
    )
  }
  // 切换品类
  const handleMenuClick = (name) => {
    console.log(name)
    switch (name) {
      case 'xican':
        console.log(cartData)
        // // 利用redux缓存, 阻止频繁发送请求
        if (westernFood.length > 0 && curPage === 'western') {
          return
        }
        // 发送请求, 获取西餐数据
        dispatch(changeLoading(true))
        dispatch(getWesternFoodData('western'))
        break
      case 'china':
        console.log(cartData)
        if (chinaFood.length > 0 && curPage === 'china') return
        dispatch(changeLoading(true))
        dispatch(getIndexData('china'))
      default:
        break
    }
  }
  // 计算购物车数据,徽标使用
  const cartDataLength = (cart) => {
    return cart.length
  }
  // 跳转至购物车页面
  const handleCartClick = () => {
    props.history.push('/cart')
  }
  // 退出页面
  function handleExit() {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确认要退出了吗?',
      onOk() {
        try {
          localStorage.removeItem('FOODopenId')
        } catch (error) {
          console.log('移除错误:', error)
        }
        props.history.push('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  return (
    <Layout>
      <Header
        style={{ position: 'fixed', zIndex: 1, width: '100%', height: '65px' }}
      >
        <Tooltip placement="bottom" title={'遇见你,是有多幸运 ^_^'}>
          <div className="logo"></div>
        </Tooltip>

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={() => handleMenuClick('china')}>
            <Tooltip placement="bottom" title={'来自中国的美食'}>
              <div className="foodCate">
                <i className="iconfont">&#xe657;</i>
                <span>中餐</span>
              </div>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => handleMenuClick('xican')}>
            <Tooltip placement="bottom" title={'西方风情'}>
              <div className="foodCate">
                <i className="iconfont">&#xe64d;</i>
                <span>西餐</span>
              </div>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="3" onClick={() => handleMenuClick('tiandian')}>
            <Tooltip placement="bottom" title={'甜到心里的美食'}>
              <div className="foodCate">
                <i className="iconfont">&#xe61f;</i>
                <span>甜点</span>
              </div>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="4" className="cart" onClick={handleCartClick}>
            <Tooltip placement="bottom" title={'去往购物车'}>
              <Badge count={cartDataLength(cartData)}>
                <div className="carticonBox">
                  <i className="iconfont carticon">&#xf0179;</i>
                </div>
              </Badge>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="5" className="exit" onClick={handleExit}>
            <Tooltip placement="bottom" title={'暂时离开'}>
              <div className="exiticonBox">
                <i className="iconfont exit">&#xe72e;</i>
              </div>
            </Tooltip>
          </Menu.Item>
        </Menu>
      </Header>

      <Content
        className="contentWrapper"
        style={{ padding: '30px 30px', marginTop: 64 }}
      >
        {isLoading && <Spin size="large" className="loading" />}

        {renderCard()}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
export default Home

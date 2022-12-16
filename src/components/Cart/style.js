import styled from 'styled-components'

export const CartContainer = styled.div`
  width: 100%;
  background-color: #f0f2f5;
  .cartNoData {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .cartNoDataBtn {
      margin-left: 50%;
      margin-top: 30px;
      transform: translateX(-50%);
    }
  }
`

export const CartHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 65px;
  background: #001529;
  width: 100%;
  padding: 0 50px;
  display: flex;
  align-items: center;
  z-index: 10;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .backBox {
    margin-left: 50px;
  }
`

export const CartContent = styled.div`
  width: 100%;
  background: #fff;
  margin: 0 auto;
  padding: 24px;
  padding-top: 89px;
  box-sizing: border-box;
  .ant-list-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .previewImgBox {
    width: 100%;
    height: 100%;
  }
  .cartHeader {
    > span {
      display: inline-block;
      width: 20%;
    }
  }
  .cartFoodItem {
    width: 100%;
    height: 100%;
    display: flex;
    .imgBox {
      width: 20%;
      height: 100%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
    }
    .foodName {
      width: 20%;
      height: 50px;
      line-height: 50px;
    }
    .inputBox {
      width: 20%;
      height: 50px;
      padding: 10px 0;
    }
    .operating {
      width: 20%;
      padding: 10px 0;
    }
    .priceCount {
      width: 20%;
      line-height: 50px;
      color: red;
      font-weight: 700;
    }
  }
`

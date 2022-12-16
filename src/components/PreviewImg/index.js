import React, { useState } from 'react'
import * as ReactDom from 'react-dom'
import { Modal } from 'antd'
const Index = (props) => {
  const [visible, setVisible] = useState(true)
  const { url, cancelCallBack } = props

  const handelCancel = () => {
    setVisible(false)
    cancelCallBack && cancelCallBack()
  }

  return (
    <Modal
      width="700px"
      visible={visible}
      footer={null}
      onCancel={handelCancel}
      centered
    >
      <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
        <img src={url} style={{ width: '100%' }} alt="预览"></img>
      </div>
      <style>
        {`
              .ant-modal-close-x {
                width: 35px;
                line-height: 35px;
            }
              `}
      </style>
    </Modal>
  )
}

const PreviewImage = (props = {}) => {
  console.log('显示了吗')
  const { url, callback } = props

  const div = document.createElement('div')
  document.body.appendChild(div)

  const cancelCallBack = () => {
    const result = ReactDom.unmountComponentAtNode(div)
    if (result && div.parentNode) {
      div.parentNode.removeChild(div)
    }
    callback && callback()
  }
  ReactDom.render(
    <Index url={url} cancelCallBack={cancelCallBack}></Index>,
    div
  )
}
export default PreviewImage

import React from 'react'
import { Layout,Button } from 'antd'
import Sidebar from '../Sidebar'
function OrderManage() {
  const { Sider, Content } = Layout
  return (
    <div>
    <Layout hasSider>
      <Sider      >
        <Sidebar />
      </Sider>
      <Layout className="site-layout">
        <Content style={{overflow: 'initial',}}>
          <div>
            <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h1>Order</h1>
                <div>
                  <Button className=''>Add new Order</Button>
                  <Button className=''>Export Data</Button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <p>Order Table here</p>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>

    </div>
  )
}

export default OrderManage
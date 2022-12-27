import { Layout } from 'antd'
import React from 'react'
import './Dashboard.scss'
import Sidebar from './Sidebar';


function Dashboard() {
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
                <h1>Dashboard title</h1>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <p>DASHBOARD CONTENT</p>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>

    </div>
  )
}

export default Dashboard
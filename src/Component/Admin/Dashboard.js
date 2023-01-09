import { Layout } from 'antd'
import React from 'react'
import './Dashboard.scss'
import Sidebar from './Sidebar';
import { admin_staff } from './Page/StaffManage'
import { FileOutlined, HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

function Dashboard() {
  const { Sider, Content } = Layout
  return (
    <div>
      <Layout hasSider>
        <Sider      >
          <Sidebar />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ overflow: 'initial', }}>
            <div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                  <h1>Dashboard title</h1>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <p>DASHBOARD CONTENT</p>
                </div>
                <div style={{ margin: '40px', display: 'flex', justifyContent: 'center' }}>
                  <div className='head_content' style={{ backgroundColor: 'coral', }}><HomeOutlined /> Total number of rooms: 8</div>
                  <div className='head_content' style={{ backgroundColor: 'salmon' }}><TeamOutlined /> Total number of staffs: {admin_staff.length}</div>
                  <div className='head_content' style={{ backgroundColor: 'forestgreen' }}><UserOutlined /> Total number of users: 10</div>
                  <div className='head_content' style={{ backgroundColor: 'lightskyblue' }}><FileOutlined /> Total number of order booking: 0 </div>
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
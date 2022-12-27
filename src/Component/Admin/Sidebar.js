import { Layout, Menu, Button } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    DashboardOutlined, DatabaseOutlined, FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, UserOutlined,
    HomeOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import img_logo from '../../Image/hotel_logo.png'

function Sidebar() {
    const navigate = useNavigate()
    const { Header, Sider, Content } = Layout
    return (
        <div>
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        trigger={null}
                        collapsible
                        className='sidebar'
                        // style={{ display: 'flex', flexDirection: 'row', background: '#001529', minHeight: '100vh', height: '100%' }}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <div style={{
                        padding: "10px 0 0 0",
                        color: 'rgba(255, 255, 255, 0.65)',
                        background: '#001529'
                    }}>
                        <Link to='/'>
                        <img src={img_logo} alt='logo' width={'80px'} title='Go to Homepage'/>
                        </Link>
                    </div>
                        <Menu
                            onClick={({ key }) => {
                                navigate(key);
                            }}
                            theme='dark'
                            mode='inline'
                            items={[
                                // {
                                //     key: '/',
                                //     label: "Back to home",
                                //     icon: <GlobalOutlined/>
                                // },
                                {
                                    key: '/dashboard',
                                    label: "Dashboard",
                                    icon: <DashboardOutlined />
                                },
                                {
                                    key: '/roommanage',
                                    label: "Room manage",
                                    icon: <HomeOutlined />
                                },
                                {
                                    key: '/staffmanage',
                                    label: "Staff manage",
                                    icon: <TeamOutlined />
                                },
                                {
                                    key: '/usermanage',
                                    label: "User manage",
                                    icon: <UserOutlined />
                                },
                                {
                                    key: '/ordermanage',
                                    label: "Order manage",
                                    icon: <FileOutlined />
                                },
                                // {
                                //     key: '/exportdata',
                                //     label: "Export database",
                                //     icon: <DatabaseOutlined />
                                // },
                            ]}
                        >
                        </Menu>
                    </Sider>
                </Layout>
            </div>
        </div>
    )
}

export default Sidebar
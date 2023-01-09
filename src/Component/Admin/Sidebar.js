import { Layout, Menu, Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import {
    DashboardOutlined, DatabaseOutlined, FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, UserOutlined,
    HomeOutlined,
    GlobalOutlined,
} from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import img_logo from '../../image/hotel_logo.png'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function Sidebar() {
    /* i18next */
    const { t, i18n } = useTranslation()

    const navigate = useNavigate()

    const { Header, Sider, Content } = Layout

    const selectLanguage = localStorage.getItem('selectLanguage')

    const items = [
        getItem('Multi Language', 'multi_lang', <FontAwesomeIcon icon={faGlobe} className='text-light' style={{ fontSize: '20px' }} />, [
            getItem('English', '1'),
            getItem('Vietnamese', '2'),
        ])]

    const handleChangeLanguage = (e) => {
        if (e.key === '1') {
            i18n.changeLanguage('en')
            localStorage.setItem('selectLanguage', '1')
        }
        else {
            i18n.changeLanguage('vie')
            localStorage.setItem('selectLanguage', '2')
        }
    }

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
                            margin: '30px 0',
                            color: 'rgba(255, 255, 255, 0.65)',
                            background: '#001529',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Link to='/'>
                                <img src={img_logo} alt='logo' width={'80px'} title='Go to Homepage' />
                            </Link>
                        </div>

                        {/* multi language */}
                        <Menu
                            theme='dark'
                            onClick={handleChangeLanguage}
                            style={{
                                width: '100%',
                            }}
                            // defaultSelectedKeys={[selectLanguage]}
                            
                            selectedKeys={[selectLanguage || '1']}
                            mode="inline"
                            items={items}
                        />
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
                                    label: `${t('admin.sidebar.dashboard')}`,
                                    icon: <DashboardOutlined />
                                },
                                {
                                    key: '/room_manage',
                                    label: `${t('admin.sidebar.room_manage')}`,
                                    icon: <HomeOutlined />
                                },
                                {
                                    key: '/staff_manage',
                                    label: `${t('admin.sidebar.staff_manage')}`,
                                    icon: <TeamOutlined />
                                },
                                {
                                    key: '/user_manage',
                                    label: `${t('admin.sidebar.user_manage')}`,
                                    icon: <UserOutlined />
                                },
                                {
                                    key: '/booking_manage',
                                    label: `${t('admin.sidebar.booking_manage')}`,
                                    icon: <FileOutlined />
                                },
                                // {
                                //     key: '/export_data',
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
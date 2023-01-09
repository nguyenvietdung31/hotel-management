import React, { useState } from 'react'
import img_avt_team from '../../../image/img_avt_team.jpg'
import { Avatar, Button, Layout, Space, Table } from 'antd'
import Sidebar from '../Sidebar'
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
function StaffManage() {


  const admin_staff = [
    {
      id:'01',
      name: 'Nguyễn Việt Dũng',
      position: 'Front-end Developer',
      avatar: img_avt_team,
      age: '22',
      sex: 'male',
    },
    {
      id:'02',
      name: 'Nguyễn Minh Thanh',
      position: 'Front-end Developer',
      avatar: img_avt_team,
      age: '20',
      sex: 'male',
    },
    {
      id:'03',
      name: 'Phạm Tùng Dương',
      position: 'Back-end Developer',
      avatar: img_avt_team,
      age: '20',
      sex: 'male',
    },
    {
      id:'04',
      name: 'Nguyễn Cung Ứng',
      position: 'Back-end Developer',
      avatar: img_avt_team,
      age: '22',
      sex: 'male',
    },
  ]


  const { Header, Sider, Content } = Layout
  const [data, setData] = useState([])

  const onDelete = (id) => {
    const deleteStaff = data.filter((el) => {
      return el.id !== id
    })
    setData(deleteStaff)

  }
  const column_staff = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, record) => (
        <Avatar size={64} src={record.avatar} />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button>Edit</Button>
          <Button onClick={() => onDelete(record.id)}>Delete</Button>
        </Space>
      )
    }
  ]
  return (
    <Layout hasSider>
      <Sider      >
        <Sidebar />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ overflow: 'initial', }}>
          <div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                <h1>Staff</h1>
                <div>
                    <Space size='small'>
                      <Button type='primary' style={{ backgroundColor: '#42b72a' }}><PlusOutlined /> Add a new staff</Button>
                      <Button type='primary' style={{ backgroundColor: '#187205' }}><DownloadOutlined /> Export Data</Button>
                    </Space>
                  </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Table
                  columns={column_staff}
                  dataSource={admin_staff}
                  rowKey = {record=>record.id}
                // pagination={{
                //   pageSize: 8,
                //   total: totalPages,
                //   onChange: () => { getAllData() }
                // }}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );

}

export default StaffManage
import React, { useEffect, useState } from 'react'
import { Layout, Button, Table, Space, Spin } from 'antd'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';

function UserManage() {
  const { Sider, Content } = Layout
  const API = 'https://jsonplaceholder.typicode.com/posts'

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const onDelete = (id) => {
    const deleteUser = data.filter((el, index) => {
      return el.id !== id
    })
    setData(deleteUser)
  }

  const column_user = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
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
    },
  ]

  const getAllData = async () => {
    setLoading(true)
    await axios.get(API)
      .then(res => {
        setData(res.data)
        setTotalPages(res.data.totalPages)
        setLoading(false)
      })
  }

  useEffect(() => {
    getAllData()
  }, [])

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
                  <h1>User</h1>
                  <div>
                    <Space size='small'>
                      <Button type='primary' style={{ backgroundColor: '#187205' }}><DownloadOutlined /> Export Data</Button>
                    </Space>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  {loading ?
                    <div className="d-flex justify-content-center mt-5" style={{ height: '400px', alignItems: 'center' }}>
                      <Space direction="vertical"
                        style={{
                          width: '100%',
                        }}>
                        <Spin tip="Loading" size="large">
                          <div className="content" />
                        </Spin>
                      </Space>
                    </div>
                    :
                    <div>
                      <Table
                        columns={column_user}
                        dataSource={data}
                        pagination={{
                          pageSize: 10,
                          total: totalPages,
                          onChange: () => { getAllData() }
                        }}
                        rowKey={record=>record.id}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
}

export default UserManage
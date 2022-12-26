import React, { useEffect, useState } from 'react'

import { Layout,Button, Table,Space } from 'antd'
import Sidebar from '../Sidebar'
import axios from 'axios'

function UserManage() {
  const { Sider, Content } = Layout
  const API = 'https://jsonplaceholder.typicode.com/posts'

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [totalPages,setTotalPages] = useState(1)

  const onDelete = (id) =>{
    const deleteUser = data.filter((el,index)=>{
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
      render: (_,record) => (
        <Space size='middle'>
          <Button>Edit</Button>
          <Button onClick={()=>onDelete(record.id)}>Delete</Button>
        </Space>
      )
    },
  ]

  const getAllData = async() =>{
    setLoading(true)
    await axios.get(API)
    .then(res=>{
      setData(res.data)
      setTotalPages(res.data.totalPages)
      setLoading(false)
    })


  }

  useEffect(()=>{
    getAllData()
  },[])

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
                <h1>User</h1>
                <div>
                  <Button className=''>Add new user</Button>
                  <Button className=''>Export Data</Button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                
                <Table
                columns={column_user}
                dataSource={data}
                pagination={{
                  pageSize:10,
                  total:totalPages,
                  onChange: ()=>{getAllData()}
                }}
                />
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
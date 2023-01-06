import React, { useEffect, useState } from 'react'
import { Layout, Button, Table, Space, Spin, Modal, Input, message } from 'antd'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { DeleteOutlined, DownloadOutlined, EditOutlined, } from '@ant-design/icons';
import { CSVLink } from 'react-csv'

function UserManage() {
  const { Sider, Content } = Layout
  const API = 'https://jsonplaceholder.typicode.com/users'

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const [isEditing, setIsEditing] = useState(false);
  const [editingRooms, setEditingRooms] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  // edit data
  const onEdit = (data) => {
    setIsEditing(true);
    setEditingRooms({ ...data });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRooms(null);
  };

  // delete data
  const onDelete = (id) => {
    const deleteUser = data.filter((el,) => {
      return el.id !== id
    })
    setData(deleteUser)
    messageApi.open({
      type: 'success',
      content: 'Delete completed successfully',
    });
  }

  const headers = [
    { label: 'Id', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Username', key: 'username' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
    { label: 'Phone', key: 'phone' },
    { label: 'Website', key: 'website' },
  ]

  const column_user = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (_, { address }) => (
        <div>
          <div>{address.street},{address.suite},{address.city}</div>
          <div>{address.zipcode}</div>
          <div>{address.geo.lat}{address.geo.lng}</div>
        </div>
      )
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (_, { company }) => (
        <div>
          <div>{company.name}</div>
          <div>{company.catchPhrase}</div>
          <div>{company.bs}</div>
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => onEdit(record)}><EditOutlined /> Edit</Button>
          <Button type='primary' danger onClick={() => onDelete(record.id)}><DeleteOutlined /> Delete</Button>
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
            {contextHolder}
            <div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                  <h1>{data.length} User</h1>
                  <div>
                    <Space size='small'>
                      <CSVLink data={data} headers={headers} filename='users.csv'>
                        <Button type='primary' style={{ backgroundColor: '#187205' }}><DownloadOutlined /> Export Data to CSV</Button>
                      </CSVLink>
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
                          pageSize: 5,
                          total: totalPages,
                          onChange: () => { getAllData() }
                        }}
                        rowKey={record => record.id}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* Edit form*/}
      <Modal
        title="Edit"
        open={isEditing}
        centered
        onOk={() => {
          setData((pre) => {
            return pre.map((data) => {
              if (data.id === editingRooms.id) {
                return editingRooms;
              } else {
                return data;
              }
            });
          });
          messageApi.open({
            type: 'success',
            content: 'Edit completed successfully',
          });
          resetEditing();
        }}
        onCancel={() => {
          resetEditing();
        }}
      >
        <Input
          value={editingRooms?.name}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.username}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, username: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.email}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, email: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.phone}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, phone: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.website}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, website: e.target.value };
            });
          }}
        />
      </Modal>

    </div>
  )
}

export default UserManage
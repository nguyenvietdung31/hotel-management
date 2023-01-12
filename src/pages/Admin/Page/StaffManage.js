import React, { useState } from 'react'
import { Avatar, Button, Layout, message, Space, Table, Modal, Input } from 'antd'
import Sidebar from '../Sidebar'
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv'
import { staffs } from '../../../Service/Staff_service/Staff';
function StaffManage() {

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Sex', key: 'sex' },
    { label: 'Position', key: 'position' },
  ]


  const { Sider, Content } = Layout
  const [data, setData] = useState(staffs)

  const [isEditing, setIsEditing] = useState(false);
  const [editingRooms, setEditingRooms] = useState(null);


  const [messageApi, contextHolder] = message.useMessage();

  // edit data
  const onEdit = (staff) => {
    setIsEditing(true);
    setEditingRooms({ ...staff });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRooms(null);
  };

  const onDelete = (id) => {
    const deleteStaff = data.filter((el) => {
      return el.id !== id
    })
    setData(deleteStaff)
    messageApi.open({
      type: 'success',
      content: 'Delete completed successfully',
    });

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
          <Button type='primary' onClick={() => onEdit(record)}><EditOutlined /> Edit</Button>
          <Button type='primary' danger onClick={() => onDelete(record.id)}><DeleteOutlined /> Delete</Button>
        </Space>
      )
    }
  ]
  return (
    <>
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
                  <h1>Staff: {data.length} people</h1>
                  <div>
                    <Space size='small'>
                      <Button type='primary' style={{ backgroundColor: '#42b72a' }}><PlusOutlined /> Add a new staff</Button>
                      <CSVLink data={staffs} headers={headers} filename='staff.csv'>
                        <Button type='primary' style={{ backgroundColor: '#187205' }}><DownloadOutlined /> Export Data to CSV</Button>
                      </CSVLink>
                    </Space>
                  </div>
                </div>
                <hr/>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Table
                    bordered={true}
                    columns={column_staff}
                    dataSource={data}
                    rowKey={record => record.id}
                    pagination={false}
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

      {/* Edit form*/}
      <Modal
        title="Edit"
        open={isEditing}
        centered
        onOk={() => {
          setData((pre) => {
            return pre.map((staff) => {
              if (staff.id === editingRooms.id) {
                return editingRooms;
              } else {
                return staff;
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
          value={editingRooms?.age}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, age: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.sex}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, sex: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.position}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, position: e.target.value };
            });
          }}
        />
      </Modal>
    </>

  );

}

export default StaffManage
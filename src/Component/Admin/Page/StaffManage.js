import React, { useState } from 'react'
import img_avt_team from '../../../Image/img_avt_team.jpg'
import { Avatar, Button, Layout, Space, Table, message, Modal, Input } from 'antd'
import Sidebar from '../Sidebar'
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv'
export const admin_staff = [
  {
    id: '01',
    name: 'Nguyễn Việt Dũng',
    position: 'Front-end Developer',
    avatar: img_avt_team,
    age: '23',
    sex: 'male',
  },
  {
    id: '02',
    name: 'Nguyễn Minh Thanh',
    position: 'Front-end Developer',
    avatar: img_avt_team,
    age: '21',
    sex: 'male',
  },
  {
    id: '03',
    name: 'Phạm Tùng Dương',
    position: 'Back-end Developer',
    avatar: img_avt_team,
    age: '21',
    sex: 'male',
  },
  {
    id: '04',
    name: 'Nguyễn Cung Ứng',
    position: 'Back-end Developer',
    avatar: img_avt_team,
    age: '23',
    sex: 'male',
  },
  {
    id: '05',
    name: 'Quang Vũ',
    position: 'Front-end Developer',
    avatar: img_avt_team,
    age: '24',
    sex: 'male',
  },
]
function StaffManage() {

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Sex', key: 'sex' },
    { label: 'Position', key: 'position' },
  ]


  const { Sider, Content } = Layout
  const [data, setData] = useState(admin_staff)

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
                      <CSVLink data={admin_staff} headers={headers} filename='staff.csv'>
                        <Button type='primary' style={{ backgroundColor: '#187205' }}><DownloadOutlined /> Export Data to CSV</Button>
                      </CSVLink>
                    </Space>
                  </div>
                </div>
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
      </Modal>age
    </>

  );

}

export default StaffManage
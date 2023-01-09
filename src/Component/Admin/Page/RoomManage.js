import { Image, Modal, Table, Space, Button, Layout, Input, Spin } from 'antd'
import React from 'react'
import Sidebar from '../Sidebar'
import { useState, useEffect } from "react";
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllData } from '../../../Service/Room_service/API_Service';
import Loader from '../../utilities/Loader';
import Error from '../../utilities/Error';
import { useQuery } from 'react-query';

function RoomManage() {
  const { Header, Sider, Content } = Layout
  const [allRooms, setAllRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  // edit data
  const [isEditing, setIsEditing] = useState(false);
  const [editingRooms, setEditingRooms] = useState(null);

  const onEdit = (allRoom) => {
    setIsEditing(true);
    setEditingRooms({ ...allRoom });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRooms(null);
  };

  // delete data
  const onDelete = (id) => {
    const deleteRoom = allRooms.filter((el) => el.id !== id
    )
    setAllRooms(deleteRoom)
  }

  // table column
  const column_room = [
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
      title: 'Image',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_, record) => (
        <Image.PreviewGroup>
          <Image src={record.avatar} width={200} />
        </Image.PreviewGroup>
      )
    },
    {
      title: 'Price',
      dataIndex: `price`,
      key: 'price',
    },
    {
      title: 'Bed',
      dataIndex: 'bed',
      key: 'bed',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => ( //function(text, record, index)
        <Space size='middle'>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record.id)}>Delete</Button>
        </Space>
      )
    },
  ]

  // Fetcher function
  const getData = async () => {
    const res = await getAllData()
    setAllRooms(res)
    return res
  }

  // Using the hook
  const { data, error, isLoading, isError } = useQuery('Rooms', getData, { refetchInterval: 300000 })

  /* while loading -> display this */
  if(isLoading) return <Loader />

  /* if error -> display this */
  if(isError) return <Error description={error.message} />

  return (
    <>
      <Layout hasSider>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout >
          <Content style={{ overflow: 'initial', }}>
            <div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                  <h1>Room</h1>
                  <div>
                    <Space size='small'>
                      <Button type='primary' style={{ backgroundColor: '#42b72a' }}><PlusOutlined /> Add new room</Button>
                      <Button type='primary' style={{ backgroundColor: '#187205' }}><DownloadOutlined /> Export Data</Button>
                    </Space>
                  </div>
                </div>
                {isLoading ?
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
                      columns={column_room}
                      dataSource={allRooms}
                      pagination={{
                        pageSize: 8,
                        total: totalPages,
                        onChange: () => { getData() }
                      }}
                      rowKey={record=>record.id}
                    />
                  </div>
                }
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* Edit form*/}
      <Modal
        title="Edit"
        open={isEditing}
        onOk={() => {
          setAllRooms((pre) => {
            return pre.map((allRoom) => {
              if (allRoom.id === editingRooms.id) {
                return editingRooms;
              } else {
                return allRoom;
              }
            });
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
          value={editingRooms?.price}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, price: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.bed}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, bed: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.size}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, size: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.type}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, type: e.target.value };
            });
          }}
        />
        <Input
          value={editingRooms?.description}
          onChange={(e) => {
            setEditingRooms((pre) => {
              return { ...pre, description: e.target.value };
            });
          }}
        />
      </Modal>
    </>


  );
}

export default RoomManage
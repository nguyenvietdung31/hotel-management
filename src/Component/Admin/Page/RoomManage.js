import { Image, Modal, Table, Space, Button, Layout, Input, Spin, message } from 'antd'
import React from 'react'
import Sidebar from '../Sidebar'
import { useState, } from "react";
import { DeleteOutlined, DownloadOutlined, EditOutlined, PictureTwoTone, PlusOutlined } from '@ant-design/icons';
import { getAllData } from '../../../Service/Room_service/API_Service';
import Loader from '../../utilities/Loader';
import Error from '../../utilities/Error';
import { useQuery } from 'react-query';
import { CSVLink } from 'react-csv'

function RoomManage() {
  const { Sider, Content } = Layout
  const [allRooms, setAllRooms] = useState([])
  const [totalPages, setTotalPages] = useState(1)


  const [isEditing, setIsEditing] = useState(false);
  const [editingRooms, setEditingRooms] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  // Fetcher function
  const getData = async () => {
    const res = await getAllData()
    setAllRooms(res)
    setTotalPages(res)
    return res
  }

  // Using the hook
  const { data, error, isLoading, isError } = useQuery('Rooms', getData, { refetchInterval: 300000 })

  /* while loading -> display this */
  if (isLoading) return <Loader />

  /* if error -> display this */
  if (isError) return <Error description={error.message} />


  const headers = [
    { label: 'Id', key: 'id' },
    { label: 'Name', key: 'name' },
    // { label: 'Image', key: 'image' },
    { label: 'Price', key: 'price' },
    { label: 'Bed', key: 'bed' },
    { label: 'Size', key: 'size' },
    { label: 'Type', key: 'type' },
    { label: 'Description', key: 'description' },
    // { label: 'Services', key: 'services' },

  ]

  // name of column in table
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
    // {
    //   title: 'Image',
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   render: (_, record) => (
    //     <Image.PreviewGroup>
    //       <Image src={record.avatar} width={200} />
    //     </Image.PreviewGroup>
    //   )
    // },
    Table.EXPAND_COLUMN,
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
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
      render: (_, record) => (
        <ul style={{ listStyleType: 'circle' }}>
          {record.services.map((service, index) =>
            <li key={index}>{service}</li>
          )}
        </ul>
      )

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => ( //function(text, record, index)
        <Space size='middle'>
          <Button type='primary' onClick={() => onEdit(record)}><EditOutlined /> Edit</Button>
          <Button type='primary' danger onClick={() => onDelete(record.id)}><DeleteOutlined /> Delete</Button>
        </Space>
      )
    },
  ]

  // edit data
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
    const deleteRoom = allRooms.filter((el) => {
      return el.id !== id
    })
    setAllRooms(deleteRoom)
    messageApi.open({
      type: 'success',
      content: 'Delete completed successfully',
    });
  }

  return (
    <>
      <Layout hasSider>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout >
          <Content style={{ overflow: 'initial', }}>
            {contextHolder}
            <div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                  <h1>Total {allRooms.length} rooms </h1>
                  <div>
                    <Space size='small'>
                      <Button type='primary' style={{ backgroundColor: '#42b72a' }}><PlusOutlined /> Add new room</Button>
                      <CSVLink data={data} headers={headers} filename='rooms.csv'>
                        <Button type='primary' style={{ backgroundColor: '#187205' }}><DownloadOutlined /> Export Data to CSV</Button>
                      </CSVLink>
                    </Space>
                  </div>
                </div>
                <hr />
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
                        pageSize: 4,
                        total: totalPages,
                        onChange: () => { getData() }
                      }}
                      rowKey={record => record.id}
                      expandable={{
                        expandedRowRender: (record) => (
                          <Image.PreviewGroup>
                            <Image src={record.avatar} width={200} />
                          </Image.PreviewGroup>
                        ),
                        expandIcon: ({ expanded, onExpand, record }) =>
                          expanded ? (
                            <PictureTwoTone twoToneColor="#52c41a" onClick={e => onExpand(record, e)} title='Close' />
                          ) : (
                            <PictureTwoTone twoToneColor="#52c41a" onClick={e => onExpand(record, e)} title="Click to see all images" />
                          ),
                        expandRowByClick: 'true',
                        columnTitle: 'Image'
                      }}
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
        centered
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
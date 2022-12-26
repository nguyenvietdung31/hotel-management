import { Button, Checkbox, Form, Input, Typography, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Booking_Form() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const test = (e) => {
    console.log(e)
    messageApi.open({
      type: 'success',
      content: 'Booking room success',
    });
  }
  const { Title } = Typography
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 5,
        // offset:12,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  }
  const tailFormItemLayOut = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 12,
        offset: 8,
      },

    },
  }

  return (
    <div className='container'>
      <div className='mt-4'>
        <Button
              onClick={() => navigate(`/rooms`, { replace: true })}
              type='primary'
              style={{ backgroundColor: 'rgb(22 163 74)' }}
            >
              See another room
            </Button>
        <Title level={2} className='text-center mt-4'>Booking Room</Title>
        <p className='text-center'>Fill the form below to book your room, specify the guests expected and number of days likely to stay and will get back
          to you shortly
        </p>
        <hr />
      </div>
      <div>
        <Form
          {...formItemLayout}
          name='booking'
          onFinish={test}
          scrollToFirstError
          style={{width:'100%'}}
        >
          <Form.Item
            name='fullname'
            label='Your name'
            rules={[{
              required: true,
              message: 'Please fill your name'
            },
            {
              pattern: /^[^-\s][a-zA-Z_\s-]+$/,
              message: 'Please fill correct name (character format string a to z)'
            }
            ]}
          >
            <Input placeholder='What is your name?' />
          </Form.Item>
          <Form.Item
            name='id'
            label='ID or citizen identification'
            rules={[{
              required: true,
              message: 'Please fill your ID or citizen identification'
            },
            {
              pattern: /\d{12}/,
              message: 'Please fill correct ID (only number and 12 characters)'
            }
            ]}>
            <Input placeholder='What is your ID?'
              maxLength={12} />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Number Phone'
            rules={[{
              required: true,
              message: 'Please fill your number phone'
            },
            {
              pattern: /(0)\d{9}/,
              message: 'Please fill correct number phone (start with 0 and the length is 10 characters)'
            },
            ]}>
            <Input placeholder='What is your number phone?'
              maxLength={10} />
          </Form.Item>
          <Form.Item
            name='note'
            label='Note'>
            <Input.TextArea
              placeholder='Fill it if you need anything'
              showCount
              maxLength={500}
              style={{
                height: '120px',
                resize: 'none'
              }} />
          </Form.Item>
          <Form.Item
            {...tailFormItemLayOut}
            name='confirm'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Please confirm the order if you wanna book a room')),
              },
            ]}
          >
            <Checkbox>
              Please confirm to complete the order
            </Checkbox>
          </Form.Item>
          <Form.Item
            {...tailFormItemLayOut}
          >
            {contextHolder}
            <Button type='primary' htmlType='submit'>
              Booking our room
            </Button>
            &emsp; {/* tab character */}
            &emsp; {/* tab character */}
            
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}

export default Booking_Form
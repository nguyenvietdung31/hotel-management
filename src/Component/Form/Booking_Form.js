import { Button, Checkbox, Form, Input, Typography, message } from 'antd'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Booking_Form.scss'
import PageTitle from '../Utilities/PageTitle'
import { useTranslation } from 'react-i18next'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'
import { useSelector } from "react-redux"


function Booking_Form() {

  /* using to redirect page */
  const navigate = useNavigate()

  /* i18next */
  const { t, i18n } = useTranslation()

  /* store in redux */
  const storeRoom = useSelector(state => state.room)


  const [messageApi, contextHolder] = message.useMessage()

  const test = (e) => {
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
        span: 6,
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
    <>
      {/* set title of page */}
      <PageTitle title={t('title.title_booking_form')} />

      <Header />

      <div className='container' style={{ paddingTop: '80px' }}>
        <div className="row">
          <div className='col-lg-12 col-sm-12- col-xs-12 mt-5 mb-5'>
            <Button className='font-weight-bold'
              onClick={() => navigate(`/rooms`)}
              type='primary'
              style={{ backgroundColor: 'rgb(22 163 74)' }}
            >
              {t('booking.booking_button_rooms')}
            </Button>
          </div>

          <div className="col-lg-3 col-sm-12 col-xs-12 mt-3">
            <div className="wrap_room_infor">
              <div className="contain_title">
                <p>{t('booking.booking_room_title')}</p>
              </div>
              <table className='table table-striped'>
                <tbody>
                  <tr>
                    <td>{t('booking.booking_room')}</td>
                    <td>{storeRoom.name}</td>
                  </tr>
                  <tr>
                    <td>{t('booking.booking_room_price')}</td>
                    <td>{storeRoom.price}</td>
                  </tr>
                  <tr>
                    <td>{t('booking.booking_room_startdate')}</td>
                    <td>{storeRoom.startDate}</td>
                  </tr>
                  <tr>
                    <td>{t('booking.booking_room_enddate')}</td>
                    <td>{storeRoom.endDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='col-lg-9 col-sm-12 col-xs-12 mt-3 mb-4'>
            <div className="wrap_form pt-4 pb-4 pl-5 pr-5">
              <Title level={2} className='text-center'>{t('booking.booking_form_title')}</Title>
              <p className='text-center'>{t('booking.booking_form_description')}</p>
              <hr />
              <Form
                {...formItemLayout}
                name='booking'
                onFinish={test}
                scrollToFirstError
                style={{ width: '100%', marginTop: '10px' }}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item className='font-weight-bold'
                  name='fullname'
                  label={t('booking.booking_form_name')}
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
                  <Input placeholder={t('booking.booking_form_name_plh')} />
                </Form.Item>
                <Form.Item className='font-weight-bold'
                  name='id'
                  label={t('booking.booking_form_ID')}
                  rules={[{
                    required: true,
                    message: 'Please fill your citizen identification'
                  },
                  {
                    pattern: /\d{12}/,
                    message: 'Please fill correct citizen identification (only number and 12 characters)'
                  }
                  ]}>
                  <Input placeholder={t('booking.booking_form_ID_plh')}
                    maxLength={12} />
                </Form.Item>
                <Form.Item className='font-weight-bold'
                  name='phone'
                  label={t('booking.booking_form_phone')}
                  rules={[{
                    required: true,
                    message: 'Please fill your number phone'
                  },
                  {
                    pattern: /(0)\d{9}/,
                    message: 'Please fill correct number phone (start with 0 and the length is 10 characters)'
                  },
                  ]}>
                  <Input placeholder={t('booking.booking_form_phone_plh')}
                    maxLength={10} />
                </Form.Item>
                <Form.Item className='font-weight-bold'
                  name='note'
                  label={t('booking.booking_form_note')}
                >
                  <Input.TextArea
                    placeholder={t('booking.booking_form_note_plh')}
                    showCount
                    maxLength={500}
                    style={{
                      height: '120px',
                      resize: 'none'
                    }} />
                </Form.Item>
                <Form.Item className='font-weight-bold'
                  {...tailFormItemLayOut}
                  name='confirm'
                  valuePropName='checked'
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error(t('booking.booking_form_confirm_err'))),
                    },
                  ]}
                >
                  <Checkbox>
                    {t('booking.booking_form_confirm')}
                  </Checkbox>
                </Form.Item>
                <Form.Item className='font-weight-bold'
                  {...tailFormItemLayOut}
                >
                  {contextHolder}
                  <Button type='primary' htmlType='submit'>
                    {t('booking.booking_form_button')}
                  </Button>

                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Booking_Form
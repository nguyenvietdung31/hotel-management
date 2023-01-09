import { Button, Checkbox, Form, Input, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Booking_Form.scss'
import PageTitle from '../utilities/PageTitle'
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux"
import { bookingService } from '../../Service/Room_service/API_Service'
import Notify from '../notification/Notify'


function Booking_Form() {

  /* using to redirect page */
  const navigate = useNavigate()

  /* i18next */
  const { t, i18n } = useTranslation()

  /* store in redux */
  const storeRoom = useSelector(state => state.room)

  const user = JSON.parse(localStorage.getItem('user'))

  /* if have not already choose room -> redirect to home page */
  useEffect(() => {
    if (storeRoom.name === null) {
      navigate('/')
    }
  }, [])

  const [notify, setNotify] = useState({
    status: false,
    message: '',
    type: ''
  })

  const handleSubmit = (values) => {
    const infor = {
      name: values.fullname,
      id: values.id,
      phone: values.phone,
      note: values.note,
    }

    handleBooking(infor)
  }

  /* handle booking room */
  const handleBooking = async (infor) => {
    await bookingService('/booking_form', infor)
      .then(res => {
        /* set notification */
        setNotify({
          status: true,
          message: 'You have booked successfully!',
          type: 'success'
        })
        handleNotify()
      })

      .catch(err => {
        /* set notification */
        setNotify({
          status: true,
          message: err.message,
          type: 'error'
        })
        handleNotify()
      })
  }

  /* display notify */
  const handleNotify = () => {
    setTimeout(() => {
      setNotify({ status: false })
    }, [2000])
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

      <div className='container' style={{ paddingTop: '80px' }}>
        {notify.status && <Notify message={notify.message} type={notify.type} />}
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
                    <td>$ {storeRoom.price}</td>
                  </tr>
                  <tr>
                    <td>{t('booking.booking_room_size')}</td>
                    <td>{storeRoom.size}</td>
                  </tr>
                  <tr>
                    <td>{t('booking.booking_room_bed')}</td>
                    <td>{storeRoom.bed}</td>
                  </tr>
                  <tr>
                    <td>{t('booking.booking_room_type')}</td>
                    <td>{storeRoom.type}</td>
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
                onFinish={handleSubmit}
                scrollToFirstError
                style={{ width: '100%', marginTop: '10px' }}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item className='font-weight-bold'
                  name='fullname'
                  label={t('booking.booking_form_name')}
                  initialValue={user.firstName}
                >
                  <Input readOnly />
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
                  initialValue={user.id}
                  >
                  <Input readOnly />
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
                  <Button type='primary' htmlType='submit'>
                    {t('booking.booking_form_button')}
                  </Button>

                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Booking_Form
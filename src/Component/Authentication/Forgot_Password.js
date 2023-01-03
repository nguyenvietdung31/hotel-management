import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd'
import PageTitle from '../Utilities/PageTitle'
import { useState } from 'react'
import Notify from '../Notification/Notify'
import { useNavigate } from 'react-router-dom'
import { postData, postDataService } from '../../Service/Account_service/API_Service'

function Forgot_Password() {

    const API = 'aaa'

    const [email, setEmail] = useState('')
    const [notifyCheckMail, setNotifyCheckMail] = useState(false)
    const [notify, setNotify] = useState({
        status: false,
        message: '',
        type: ''
    })

    const navigate = useNavigate()
    /* When submit form Login -> do something */
    const onFinish = (values) => {
        /* data will be sent through api */
        const data = { Email: email }

        /*  Send email to server to handle */
        handleForgotPassword(data)

        /* reset input field */
        handleResetInputField()
    }

    /* forgot password */
    const handleForgotPassword = async (data) => {
        await postDataService(data)
            .then(res => {
                /* set notification */
                setNotify({
                    status: true,
                    message: 'Successfully!',
                    type: 'success'
                })
                handleNotify()

                /* notify check mail to activate account */
                setNotifyCheckMail(true)
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

    /* hide notification */
    const handleNotify = () => {
        setTimeout(() => {
            setNotify({status: false})
        }, 2000)
    }

    /* reset input field */
    const handleResetInputField = () => {
        setEmail('')
    }

    return (
        <>
            {/* set title of page */}
            <PageTitle title='Forgot password page' />

            <div className="container-fluid">
                {notify.status && <Notify message={notify.message} type={notify.type} />}

                <div className="row">
                    <div className="wrapper col-md-12 col-sm-12 col-xs-12">
                        <div className="wrap_form">
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                            >
                                <div className="contain_logo m-4">
                                    <img src={logo} alt="avt" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
                                </div>
                                <p className='title mb-5 font-weight-bold'>FORGOT PASSWORD</p>

                                {notifyCheckMail &&
                                    <div className='p-2 mb-3 d-flex'
                                        style={{
                                            alignItem: 'center', justifyContent: 'center', borderRadius: '4px',
                                            background: 'linear-gradient(to right bottom, #95f84f, #9ce469, #d1f7d1)'
                                        }}>
                                        <p className='text-light mb-0'>Please check your email to get link to reset password!</p>
                                    </div>
                                }
                                <Form.Item
                                    name="Email"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faEnvelope} />}
                                        type="email"
                                        placeholder="Email"
                                        onChange={e => setEmail(e.target.value.trim())} />

                                </Form.Item>

                                <div className="contain_button mt-4">
                                    <button className='btn btn-success text-light btn_login'>SUBMIT</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot_Password
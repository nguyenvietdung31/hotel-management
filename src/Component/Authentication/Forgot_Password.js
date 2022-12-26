import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd'
import PageTitle from '../Utilities/PageTitle'
import { useState } from 'react'
import axios from 'axios'


function Forgot_Password() {

    const API = 'aaa'

    const [email, setEmail] = useState('')
    const [notifyCheckMail, setNotifyCheckMail] = useState(false)

    /* When submit form Login -> do something */
    const onFinish = (values) => {
        /* write code here */

        handleForgotPassword()
        handleResetInputField()
    }

    /* forgot password */
    const handleForgotPassword = async () => {
        await axios.post(`${API}`, {
            email: email
        })
            .then(res => setNotifyCheckMail(true))
            .catch(err => console.error(err))
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
                                    <img src={logo} alt="avt" />
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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../Utilities/PageTitle'
import Notify from '../Notification/Notify'
import { resetPasswordService } from '../../Service/Account_service/API_Service'
import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd'

function Reset_Password() {

    const [password, setPassword] = useState('')
    const [cfpassword, setCFPassword] = useState('')
    const [notify, setNotify] = useState({
        status: false,
        message: '',
        type: ''
    })

    const navigate = useNavigate()

    /* When submit form -> handle reset password */
    const onFinish = (values) => {
        const data = { Password: password }

        /* handle reset password */
        handleResetPassword(data)

        /* reset field */
        handleResetInputField()
    }

    /* reset password */
    const handleResetPassword = async (data) => {
        await resetPasswordService(data)
            .then(res => {
                /* set notification */
                setNotify({
                    status: true,
                    message: 'Your have reseted password successfully!',
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

    /* hide notification */
    const handleNotify = () => {
        setTimeout(() => {
            setNotify({ status: false })
        }, 2000)
    }

    /* reset input field */
    const handleResetInputField = () => {
        setPassword('')
        setCFPassword('')
    }

    return (
        <>
            {/* set title of page */}
            <PageTitle title='Reset password page' />

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
                                <p className='title mb-5 font-weight-bold'>RESET PASSWORD</p>

                                <Form.Item
                                    name="new_password"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your new password!',
                                        },
                                        {
                                            min: 6,
                                            max: 24,
                                            message: 'Please input your password >=6 characters and <= 24 characters'
                                        },
                                        {
                                            pattern: /^\S*$/,
                                            message: 'Please input your password without whitespace'
                                        },
                                    ]}
                                >
                                    <Input.Password className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faLock} />}
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value.trim())}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="cf_new_password"
                                    dependencies={['new_password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your confirm password!',
                                        },
                                        {
                                            min: 6,
                                            max: 24,
                                            message: 'Please input your password >=6 characters and <= 24 characters'
                                        },
                                        {
                                            pattern: /^\S*$/,
                                            message: 'Please input your password without whitespace'
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('new_password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faLock} />}
                                        type="password"
                                        placeholder="Confirm password"
                                        value={cfpassword}
                                        onChange={e => setCFPassword(e.target.value.trim())}
                                    />
                                </Form.Item>

                                <div className="contain_button mt-4">
                                    <button className='btn btn-success text-light btn_login'>RESET PASSWORD</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset_Password
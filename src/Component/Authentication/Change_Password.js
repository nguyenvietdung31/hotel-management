import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd'
import PageTitle from '../Utilities/PageTitle'
import AxiosInstance from '../../Axios Interceptor/AxiosInstance'
import { useState } from 'react'
import Notify from '../Notification/Notify'
import { useNavigate } from 'react-router-dom'


function Change_Password() {

    /* API */
    const API = 'abc'

    /* userID */
    const [userID, setUserID] = useState(null)

    /* old pass and new pass state */
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    
    /* notification state */
    const [notify, setNotify] = useState(false)

    const navigate = useNavigate()

    /* When submit form Login -> do something */
    const onFinish = (values) => {
        /* write code here */

        handleChangePassword()
        handleResetField()
        setNotify(true)
    }

    /* change password */
    const handleChangePassword = async () => {
        await AxiosInstance.patch(`${API}/${userID}`, {
            oldPass: oldPass,
            password: newPass
        })
        .then(() => handleRedirect('/'))
        .catch((error) => console.log(error))
    }

    /* redirect to another page */
    const handleRedirect = (path) => {
        setTimeout(() => {
            navigate(`${path}`, { replace: true })
        })
    }

    /* reset field after submit form */
    const handleResetField = () => {
        setOldPass('')
        setNewPass('')
    }

    /* hide notification */
    setTimeout(() => {
        setNotify(false)
    }, [2000])

    return (
        <>
            {/* set title of page */}
            <PageTitle title='Change password page' />

            <div className="container-fluid">
                <div className="row">
                    {notify && <Notify message='You have changed password successfully!' type='success' />}

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
                                <p className='title mb-5 font-weight-bold'>CHANGE PASSWORD</p>

                                <Form.Item
                                    name="old_password"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your old password!',
                                        },
                                        {
                                            min: 6,
                                            max: 24,
                                            message: 'Please input your password >=6 characters and <= 24 characters'
                                        },
                                        {
                                            pattern: /^\S*$/,
                                            message: 'Please input your password without whitespace'
                                        }
                                    ]}
                                >
                                    <Input.Password className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faLock} />}
                                        type="password"
                                        placeholder="Old password"
                                        onChange={e => setOldPass(e.target.value.trim())} />

                                </Form.Item>
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
                                        }
                                    ]}
                                >
                                    <Input.Password className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faLock} />}
                                        type="password"
                                        placeholder="Password"
                                        onChange={e => setNewPass(e.target.value.trim())}
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
                                    />
                                </Form.Item>

                                <div className="contain_button mt-4">
                                    <button className='btn btn-success text-light btn_login'>CHANGE PASSWORD</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Change_Password
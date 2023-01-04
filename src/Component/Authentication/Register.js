import { useState } from 'react'
import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope, faSignature, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd'
import PageTitle from '../Utilities/PageTitle'
import { Link, useNavigate } from 'react-router-dom'
import Notify from '../Notification/Notify'
import { postDataService } from '../../Service/Account_service/API_Service';

function Register() {

    /* API */
    const API = 'https://639003d065ff41831106d1c8.mockapi.io/api/login/Account'

    /* Initialize state */
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfpassword, setCFPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [notify, setNotify] = useState({
        status: false,
        message: '',
        type: ''
    })
    const [notifyActive, setNotifyActive] = useState(false)

    /* use this to redirect page */
    const navigate = useNavigate()

    /* When submit form Register set value for 5 states below */
    const onFinish = (values) => {
        const acc = {
            Email: email,
            Password: password,
            Fullname: fullname,
            Phone: phone,
            Address: address
        }
        /* handle register here */
        handleRegister(acc)

        /* reset input field */
        handleResetInputField()
    }

    /* post data */
    const handleRegister = async (acc) => {
        await postDataService('/register', acc)
            .then(res => {
                /* set notification */
                setNotify({
                    status: true,
                    message: 'You have registed successfully!',
                    type: 'success'
                })
                handleNotify()

                /* notify check mail to activate account */
                setNotifyActive(true)

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

    /* reset input field */
    const handleResetInputField = () => {
        setFullname('')
        setEmail('')
        setPassword('')
        setCFPassword('')
        setPhone('')
        setAddress('')
    }

    /* display notify */
    const handleNotify = () => {
        setTimeout(() => {
            setNotify({status: false})
        }, [2000])
    }

    return (
        <>
            {/* set title of page */}
            <PageTitle title='Register page' />

            {/* Register UI part */}
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
                                <div className="contain_logo mb-4">
                                    <img onClick={() => navigate('/')} src={logo} alt="avt" style={{ cursor: 'pointer' }} />
                                </div>
                                <p className='title mb-3 font-weight-bold'>REGISTER</p>

                                {
                                    notifyActive &&
                                    <div className='p-3 mb-3 d-flex'
                                        style={{
                                            alignItem: 'center', justifyContent: 'center', borderRadius: '4px',
                                            background: 'linear-gradient(to right bottom, #95f84f, #9ce469, #d1f7d1)'
                                        }}>
                                        <p className='text-light mb-0'>Please check your email to activate your account!</p>
                                    </div>
                                }
                                <Form.Item
                                    name="fullname"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your fullname!',
                                        },
                                    ]}
                                >
                                    <Input className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faSignature} />}
                                        placeholder="Full name"
                                        onChange={(e) => setFullname(e.target.value.trim())}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                        {
                                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: 'Please enter a valid email address. Ex: abc@gmail.com'
                                        }
                                    ]}
                                >
                                    <Input className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faEnvelope} />}
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Please input your password!', },
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
                                        onChange={(e) => setPassword(e.target.value.trim())}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="cf_password"
                                    dependencies={['password']}
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
                                                if (!value || getFieldValue('password') === value) {
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
                                        onChange={(e) => setCFPassword(e.target.value.trim())}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Please input your phone!', },
                                        { pattern: /^[0-9]{10}$/, message: 'Please enter phone number starts with 0 and the length is 10 characters' },
                                    ]}
                                >
                                    <Input className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faPhone} />}
                                        placeholder="Phone"
                                        onChange={(e) => setPhone(e.target.value.trim())}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your address!',
                                        },
                                    ]}
                                >
                                    <Input className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faLocationDot} />}
                                        placeholder="Address"
                                        onChange={(e) => setAddress(e.target.value.trim())}
                                    />
                                </Form.Item>

                                <div className="contain_button mt-4">
                                    <button className='btn btn-success text-light btn_login'>Register</button>
                                </div>
                                <div className='text-center mt-3'>
                                    <Link className="text-primary forgotpass" to="/login">Log in now!</Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
import { useState } from 'react';
import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLock, faEnvelope, faSignature,
    faPhone, faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd';

function Register() {

    /* Initialize state */
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [addres, setAddress] = useState('')

    /* When submit form Register set value for 5 states below */
    const onFinish = (values) => {
        setFullname(values.fullname)
        setEmail(values.email)
        setPassword(values.password)
        setPhone(values.phone)
        setAddress(values.address)

        /* handle register here */

    };

    return (
        <>
            {/* Register UI part */}
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
                                <p className='title mb-5 font-weight-bold'>REGISTER</p>

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
                                    />
                                </Form.Item>

                                <div className="contain_button mt-4">
                                    <button className='btn btn-success text-light btn_login'>Register</button>
                                </div>
                                <div className='text-center mt-3'>
                                    <a className="text-primary forgotpass" href="/login">Log in now!</a>
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
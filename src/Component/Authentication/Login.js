import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd'
import PageTitle from '../Utilities/PageTitle'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const API = 'api'
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /* When submit form Login -> do something */
    const onFinish = (values) => {
        /* write code here */

        handleLogin()
    }

    const handleLogin = async () => {
        // await axios.post(API)
        // .then(res => {
        //     console.log(res.data)

        //     /* get token and save it into LocalStorage */
        // })

        /* Fake token to demo */
        localStorage.setItem('userToken', 'nmthanhToken')
        navigate(-1)
    }

    return (
        <>
            {/* set title of page */}
            <PageTitle title='Login page'/>

            {/* Login UI part */}
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
                                <p className='title mb-5 font-weight-bold'>LOG IN</p>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input className='input_tag' type='email'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faUser} />} 
                                        placeholder="Username" value={email}
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                        />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faLock} />}
                                        type="password"
                                        placeholder="Password" value={password}
                                        onChange={(e) => setPassword(e.target.value.trim())}
                                    />
                                </Form.Item>
                                
                                <a className="login-form-forgot text-primary forgotpass" href="/forgot_password">
                                    Forgot password
                                </a><br />
                                <div className="contain_button mt-4">
                                    <button className='btn btn-success text-light btn_login'>Login</button>
                                </div>
                                <div className='text-center mt-3'>
                                    <a className="text-primary forgotpass" href="/register">Register now!</a>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Login UI part */}

        </>
    )
}

export default Login
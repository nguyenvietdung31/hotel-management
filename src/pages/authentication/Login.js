import logo from '../../image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postDataService } from '../../Service/Account_service/API_Service'
import usePageTitle from '../../Component/customHook/usePageTitle'

function Login() {

    usePageTitle('Login page')

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /* When submit form Login -> do something */
    const onFinish = (values) => {
        const acc = {
            username: 'kminchelle',
            password: '0lelplR'
        }

        handleLogin(acc)
    }

    const handleLogin = async (acc) => {
        await postDataService('/login', acc)
            .then(res => {
                localStorage.setItem('access_token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data))

                /* if admin log in => access_admin = true, else access_user = true */
                // if(res.data.role === 1) {
                //     localStorage.setItem('access_admin', true)
                // } else {
                //     localStorage.setItem('access_user', true)
                // }
                localStorage.setItem('access_user', true)
                /* back to previous page */
                navigate(-1)
            })
    }

    return (
        <>
            {/* set title of page */}
            {/* <PageTitle title='Login page' /> */}

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
                                    <img src={logo} alt="avt" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Item>

                                <Link className="login-form-forgot text-primary forgotpass" to="/forgot_password">
                                    Forgot password
                                </Link><br />
                                <div className="contain_button mt-4">
                                    <button className='btn btn-success text-light btn_login'>Login</button>
                                </div>
                                <div className='text-center mt-3'>
                                    <Link className="text-primary forgotpass" to="/register">Register now!</Link>
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
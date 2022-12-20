import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd';

function Login() {

    /* When submit form Login -> do something */
    const onFinish = (values) => {
        /* write code here */
    };

    return (
        <>
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
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faUser} />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input className='input_tag'
                                        prefix={<FontAwesomeIcon className='mr-2' icon={faLock} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                
                                <a className="login-form-forgot text-primary forgotpass" href="/forgot-password">
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
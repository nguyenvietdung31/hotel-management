import logo from '../../Image/hotel_logo.png'
import './Login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Form, Input } from 'antd';


function Forgot_Password() {

    /* When submit form Login -> do something */
    const onFinish = (values) => {
        /* write code here */
        
    }

    return (
        <>
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
                                        placeholder="Email" />

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
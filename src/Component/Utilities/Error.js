import { CloseCircleOutlined } from '@ant-design/icons';
import {  Result } from 'antd';

function Error(prop) {

    return (
        <>
            <Result
                status="error"
                title="Error"
                subTitle={prop.description}
                
            ></Result>
        </>
    )
}

export default Error
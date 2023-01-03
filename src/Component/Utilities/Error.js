import {  Result } from 'antd';
import { memo } from 'react';

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

export default memo(Error)
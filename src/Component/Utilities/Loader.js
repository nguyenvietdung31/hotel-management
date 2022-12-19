import { Space, Spin } from "antd"


function Loader() {

    return (
        <>
            <div className="col-lg-12 col-sm-12 col-xs-12 mb-5 d-flex justify-content-center mt-5">
                <Space direction="vertical"
                    style={{
                        width: '100%',
                    }}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </Space>
            </div>
        </>
    )
}

export default Loader
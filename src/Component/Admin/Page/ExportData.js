import React from 'react'

import { Col, Row } from 'antd'
import Sidebar from '../Sidebar'
function ExportData() {
  return (
    <div>
      <div>
      <Row gutter={[8, 8]}>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <div>
            <h1>Export Data</h1>
          </div>
        </Col>
      </Row>
    </div>
    </div>
  )
}

export default ExportData
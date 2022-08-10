import React from 'react'
import {Breadcrumb} from 'antd'

const FinanceReceipts = () => {

  return (
    <div>
        <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>
                  Receipts
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                  New
              </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default FinanceReceipts
import React from 'react'
import {Breadcrumb} from 'antd'

const FinanceInvoices = () => {

  return (
    <div>
        <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>
                  Invoices
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                  List
              </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default FinanceInvoices
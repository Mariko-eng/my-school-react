import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';

const FinanceInvoices = () => {
  return (
    <div>
        <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
            <Breadcrumb.Item>INVOICES</Breadcrumb.Item>
            <Breadcrumb.Item>Requests For Payment</Breadcrumb.Item>
          </Breadcrumb> 
          </div>
        <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>
                  All
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/home/finance/invoices/outgoing"
                  style={{ color:"blue" }}>OutGoing</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/home/finance/invoices/incoming"
                  style={{ color:"blue" }}>Incoming</Link>
              </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default FinanceInvoices
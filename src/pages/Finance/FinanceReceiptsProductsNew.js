import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';

const FinanceReceiptsProductsNew = () => {
  return (
    <div>
      <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
            <Breadcrumb.Item>RECEIPTS</Breadcrumb.Item>
            <Breadcrumb.Item>Proof Of Payment</Breadcrumb.Item>
          </Breadcrumb> 
          </div>
        <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>
              <Link to="/home/finance/receipts"
                  style={{ color:"blue" }}>All</Link>              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/home/finance/receipts/products"
                  style={{ color:"blue" }}>Products</Link>
              </Breadcrumb.Item>
        
              <Breadcrumb.Item>
              <Link to="/home/finance/receipts/services"
              style={{ color:"blue" }}
              >Services</Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <Link to="/home/finance/receipts/logistics"
                      style={{ color:"blue" }}>Logistics</Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <Link to="/home/finance/receipts/staff"
                      style={{ color:"blue" }}>StakeHolders</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/home/finance/receipts/notifications"
                      style={{ color:"green" }}>Notifications</Link>
              </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
          <Breadcrumb
            style={{
                margin: '16px 0',
              }}>
            <Breadcrumb.Item>
                  Products
              </Breadcrumb.Item>
              <Breadcrumb.Item>
              <Link to="/home/finance/receipts/products"
                  style={{ color:"grey" }}>List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/home/finance/receipts/products/new"
                  style={{ color:"orange" }}>New</Link>
              </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}

export default FinanceReceiptsProductsNew
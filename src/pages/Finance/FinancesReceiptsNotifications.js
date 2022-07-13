import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';

const FinancesReceiptsNotifications = () => {
    return (
      <div>
          <div>
            <Breadcrumb
              style={{
                  margin: '16px 0',
                }}>
              <Breadcrumb.Item>New Requests</Breadcrumb.Item>
            </Breadcrumb> 
            </div>
          <div>
            <Breadcrumb
              style={{
                  margin: '16px 0',
                }}>
                <Breadcrumb.Item>
                  <Link to="/home/inventory/products/new"
                    >All</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/home/inventory/products/new"
                    style={{ color:"blue" }}>Procurement</Link>
                </Breadcrumb.Item>
          
                <Breadcrumb.Item>
                <Link to="/home/inventory/category/new"
                style={{ color:"blue" }}
                >Invoices</Link>
                </Breadcrumb.Item>
  
          </Breadcrumb>
        </div>
      </div>
    )
  }

export default FinancesReceiptsNotifications
import React from 'react'
import { AppBreadcrumb } from '../../components'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';


const InventoryStockRequestsAll = () => {
  return (
    <div>
       <div>
        <AppBreadcrumb title="Inventory" action1="Requests" action2="List" />
      </div>
      <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>
        <Link to="/home/inventory/requests">List</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
        <Link to="/home/inventory/requests/in" style={{ color:"blue" }}>
        Incoming Requests</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
        <Link to="/home/inventory/requests/out"
                style={{ color:"blue" }}
        >Outgoing Requests</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
        <Link to="/home/inventory/requests/add"
                style={{ color:"blue" }}
        >Make New Request</Link>
        </Breadcrumb.Item>
    </Breadcrumb>
      </div>
    </div>
  )
}

export default InventoryStockRequestsAll
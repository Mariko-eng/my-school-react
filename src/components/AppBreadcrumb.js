import React from 'react'
import { Breadcrumb } from 'antd'

const AppBreadcrumb = ({title,action1,action2,action3,action4}) => {
  return (
    <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
        <Breadcrumb.Item>{action1}</Breadcrumb.Item>
        <Breadcrumb.Item>{action2}</Breadcrumb.Item>
        <Breadcrumb.Item>{action3}</Breadcrumb.Item>
        <Breadcrumb.Item>{action4}</Breadcrumb.Item>
    </Breadcrumb>
      )
}

export default AppBreadcrumb
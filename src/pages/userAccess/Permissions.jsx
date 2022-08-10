import React, {useEffect,useState} from 'react'
import {Breadcrumb, Row,Col,Card, Space} from 'antd'
import axios from 'axios'
const Permissions = () => {
  const [perms, setPerms] = useState([])

  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/auth/content-types/perms/").then((res) =>{
      setPerms(res.data)
    })

  },[])

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>System Permissions</Breadcrumb.Item>
        <Breadcrumb.Item>
          Edit
        </Breadcrumb.Item> 
       </Breadcrumb>    
       </div>
      <div className="site-layout-content"
      style={{ 
        minHeight: "280px",
        padding: "24px",
        background: "#fff"
      }}
      >
          { perms.map((item,index) => 
          <div key={index}>
            <Space
              direction="vertical"
              size="middle"
             style={{display: 'flex', }}
              >
              <Card title = {item.name}>
                <Row                 >
                  { item.permissions.map((perm,index2) => 
                  <Col span={6} key={index2}>{perm.name}</Col>) }
                </Row>
              </Card>
            </Space>
          </div> 
        )}
      </div>
    </div> 
     )
}

export default Permissions
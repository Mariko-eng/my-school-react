import React, { useEffect, useState } from 'react'
import {Breadcrumb,Row,Col,Card,Space
  } from 'antd'
import axios from 'axios'

const TermsList = () => {
    const [terms , setTerms] = useState([])

    useEffect(() =>{
        axios.get("http://127.0.0.1:8000/basic/terms/").then((res) =>{
            setTerms(res.data)
        })
    
      },[])
  return (
    <div>
         <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Periods Of Study</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>    
       </div>
       <div>
        <Row>
            {
            terms.map((term, index) => <Col 
            key={index}
            span={6}
            >
            <Space>
            <Card title={term.name}>
                <p>Start Date</p>
                <p style={{color:"blue"}}>{term.start_date}</p>
                <p>End Date</p>
                <p style={{color:"blue"}}>{term.end_date}</p>
            </Card>
            </Space>
            </Col>)
            }
        </Row>
       </div>
    </div>
  )
}

export default TermsList
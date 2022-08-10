import React from 'react'
import { useLocation } from "react-router-dom";
import {Breadcrumb, Row,Col,Card} from 'antd'

const FeesTermPaymentDetail = () => {
  const location = useLocation()
  const {state} = location
  const data = state;
  console.log(data)

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
          <Breadcrumb.Item>School Fees Payment</Breadcrumb.Item>
          <Breadcrumb.Item>Receipt Number : {data.receipt_id}</Breadcrumb.Item>
        </Breadcrumb>    
       </div>
       <Row>
        <Col span={4}>
        </Col>
        <Col span={16}>
          <Card style={{minHeight:"400px"}}>
            <div style={{display:"flex",justifyContent:"end"}}>
              <div style={{display:"flex",flexDirection:"column"}}>
                <div>
                <p style={{color:"orange"}}>
                  {data.receipt_id}
                </p>
                </div>
                <div>Date Of Payment</div>
                <div>{data.date_created}</div>
                <div>St. Matia PS</div>
              </div>
            </div>
            <div style={{
              marginTop:"20px",
              display:"flex",
              flexDirection:"column", }}>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex",
                  justifyContent:"center"
                  }}>
                    <div>RECEIPT</div>
                    <div>(Proof Of Payment)</div>
                </div>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex",
                  justifyContent:"space-between"
                  }}>
                    <div>Student First Name</div>
                    <div
                    style={{
                      color:"blue" 
                      }}
                    >{data.student.first_name.toUpperCase()} {data.student.given_name}</div>
                </div>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex",
                  justifyContent:"space-between"
                  }}>
                    <div>Student Last Name</div>
                    <div
                    style={{
                      color:"blue" 
                      }}
                    >{data.student.last_name}</div>
                </div>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex",
                  justifyContent:"space-between"
                  }}>
                    <div>Class</div>
                    <div
                    style={{
                      color:"blue" 
                      }}
                    >{data.student.student_class.name}</div>
                </div>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex" ,
                  justifyContent:"space-between"
                  }}>
                    <div>Period Of Study</div>
                    <div
                    style={{
                    color:"blue" 
                    }}
                    >{data.term.name}</div>
                </div>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex",
                  justifyContent:"space-between"
                  }}>
                    <div>Paid By</div>
                    <div
                    style={{
                      color:"blue" 
                      }}
                    >{data.paid_by_name.toUpperCase()}</div>
                </div>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex",
                  justifyContent:"space-between"
                  }}>
                    <div>Contact</div>
                    <div
                    style={{
                      color:"blue" 
                      }}
                    >{data.paid_by_phone.toUpperCase()} {data.student.given_name}</div>
                </div>
                <div
                style={{
                  marginTop:"5px",
                  display:"flex",
                  flexDirection:"column",
                  }}>
                    <div>Amount Paid</div>
                    <div
                    style={{
                      color:"blue" 
                      }}
                    >{data.amount_paid} SHS ONLY</div>
                </div>
                <div
                style={{
                  marginTop:"20px",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"end"
                  }}>
                    <div
                    style={{
                      color:"orange" 
                      }}
                    >Thenks For The Payment</div>
                </div>
            </div>
          </Card>
        </Col>
        <Col span={4}>
        </Col>
       </Row>
    </div>
  )
}

export default FeesTermPaymentDetail
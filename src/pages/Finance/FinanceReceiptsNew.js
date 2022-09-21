import React, {useState} from 'react'
import {Breadcrumb, Card, Radio, Row,Col, Space} from 'antd'

const FinanceReceiptsNew = () => {
  const [receiptType, setReceiptType] = useState(null);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setReceiptType(e.target.value);
  };

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
      <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
      >
      <Card title="Choose Receipt Type"
      bordered={false} style={{ background : "lavender" }}>
      <Radio.Group onChange={onChange} value={receiptType} style={{ width : "100%"}}>
        <Row> 
          <Col span={8}><Radio value={1}>Pay For Products</Radio></Col>
          <Col span={8}><Radio value={2}>Pay For Services</Radio></Col>
          <Col span={8}><Radio value={3}>Pay For Logistics</Radio></Col>
          <Col span={8}><Radio value={4}>Staff Payment</Radio></Col>
          <Col span={8}><Radio value={5}>Others</Radio></Col>
        </Row>
    </Radio.Group>
    </Card>
    { receiptType === 1 && <Card title="Product's Receipt"></Card>}
    { receiptType === 2 && <Card title="Service's Receipt"></Card>}
    { receiptType === 3 && <Card title="Logistic's Receipt"></Card>}
    { receiptType === 4 && <Card title="Staff's Receipt"></Card>}
    { receiptType === 5 && <Card title="Make A Custom Receipt"></Card>}

    </Space>
      <br/>
    </div>
  )

  // const Product = () =>{
  //   return (
  //     <div>
  //         <div style={{ 
  //         display: "flex"
  //       }}>
  //         <Button  style={{ background:"blue" , color:"white"}} onClick={() => showDrawer()} >Choose Products</Button>
  //         {noOfstockInCartItems !== 0 &&
  //         <div style={{ 
  //           display: "flex"
  //         }}>
  //         <Button style={{ background:"red" , color:"white"}} onClick={() => dispatch(clearstockInCart())} >Clear List</Button>
  //         <Button>Total {noOfstockInCartItems}</Button>
  //         </div>
  //         }
  //       </div>
  //     </div>
  //   )
  // }
}

export default FinanceReceiptsNew
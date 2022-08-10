import React, {useState} from 'react'
import {Breadcrumb, Card, Radio, Row,Col, Space} from 'antd'

const FinanceInvoicesNew = () => {
  const [invoiceMode, setInvoiceMode] = useState(null);
  const [invoiceType, setInvoiceType] = useState(null);

  const onChangeInvoiceMode = (e) => {
    console.log('radio checked', e.target.value);
    setInvoiceMode(e.target.value);
  };

  const onChangeInvoiceType = (e) => {
    console.log('radio checked', e.target.value);
    setInvoiceType(e.target.value);
  };

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
      <Card title="Choose Invoice Type"
      bordered={false} style={{ background : "azure" }}>
      <Radio.Group onChange={onChangeInvoiceMode} value={invoiceMode} style={{ width : "100%"}}>
        <Row> 
          <Col span={12}><Radio value={1}>Incoming</Radio></Col>
          <Col span={12}><Radio value={2}>Outgoing</Radio></Col>
        </Row>
    </Radio.Group>
    </Card>

    { invoiceMode !== null &&  <Card title="Invoice For?"
      bordered={false} style={{ background : "lavender" }}>
      <Radio.Group onChange={onChangeInvoiceType} value={invoiceType} style={{ width : "100%"}}>
        <Row> 
          <Col span={8}><Radio value={1}>Pay For Products</Radio></Col>
          <Col span={8}><Radio value={2}>Pay For Services</Radio></Col>
          <Col span={8}><Radio value={3}>Pay For Logistics</Radio></Col>
          <Col span={8}><Radio value={4}>Staff Payment</Radio></Col>
          <Col span={8}><Radio value={5}>Others</Radio></Col>
        </Row>
    </Radio.Group>
    </Card> }

    { invoiceType === 1 && <Card title="Product's Receipt"></Card>}
    { invoiceType === 2 && <Card title="Service's Receipt"></Card>}
    { invoiceType === 3 && <Card title="Logistic's Receipt"></Card>}
    { invoiceType === 4 && <Card title="Staff's Receipt"></Card>}
    { invoiceType === 5 && <Card title="Make A Custom Receipt"></Card>}
    
    </Space>
    </div>
  )
}
export default FinanceInvoicesNew
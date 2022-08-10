import React, {useState } from 'react'
import {Form,Select,Input,Modal,Button,Breadcrumb,Card,Col,Row,DatePicker
} from 'antd'
import { 
  SearchOutlined
 } from '@ant-design/icons';
import axios from 'axios';

const SalaryPaymentNew = () => {
    const [month,setMonth] = useState("")
    const [year,setYear] = useState("")
    const [staff, setStaff] = useState({})
    const [searchResults, setSearchResults] = useState([])

    const onChangeMonth = (date,dateString) => {
      setMonth(dateString)
  }

    const onChangeYear = (date,dateString) => {
        setYear(dateString)
    }

    const getStafftData =(val) => {
      const url = `http://localhost:8000/basic/staff-search/${val}/` 
      axios.get(url, {
        headers: {
          "content-type" : "application/json" 
        }
      }).then(response => {
          setSearchResults(response.data)
      })
      .catch(error => Modal.error({title : "Staff Search Failed"}))
  }

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Salary Payment</Breadcrumb.Item>
        <Breadcrumb.Item>New</Breadcrumb.Item>
        </Breadcrumb>    
       </div>
       <Form name="search"
        autoComplete="off"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
       <Form.Item name="name" label="Search Staff" 
        rules={[
          { required: false,},]}>
        <Input prefix= {<SearchOutlined/>}
            onChange={(val) =>{
                if(val.target.value.trim().length >= 1){
                    getStafftData(val.target.value)
                }else{
                    setSearchResults([]) 
                }
            }}
            placeholder = "Enter Staff Name OR Staff ID"
        />
      </Form.Item>
      </Form>
      { searchResults.length >= 1 && 
      <Row>
        <Col span={24}>
            {
                searchResults.map((result,index) => 
                        <Card key={index}>
                        <p>(Name){result.first_name} {result.last_name} - (ID)
                        {result.staff_id} - 
                        {result.phone_number}
                        <span
                            onClick= {
                                () => {
                                    setStaff(result)
                                    setSearchResults([]) 
                                }
                            }
                        style={{ color: "green",marginLeft:"20px" }}
                        >Choose Staff Member</span>
                        </p>
                        </Card>
                    )
            }
        </Col>
      </Row>}
      {
        staff.staff_id &&
      <div className="site-layout-content"
      style={{ 
        minHeight: "200px",
        padding: "24px",
        background: "#fff"
      }}
      >
        <Row>
          <Col span={8} >
          <Card title="Staff Details">
                    <p>First Name :<span>{staff.first_name} {staff.given_name}</span></p>
                    <p>First Name :<span>{staff.last_name}</span></p>
                    <p>Staff ID :<span>{staff.staff_id}</span></p>
                </Card>
          </Col>
          <Col span={16}>
          <Form name="control-hooks"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
      <Form.Item name="term" label="Select Term"
      rules={[
        { required: true,},]}>
        <Select
        placeholder="select One"
        >
          <Select.Option value= "First Term" >First Term</Select.Option>
          <Select.Option value= "Second Term" >Second Term</Select.Option>
          <Select.Option value= "Third Term" >Third Term</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="month" label="Month" 
        rules={[
          { required: true,},]}>
        <DatePicker picker='month' onChange={onChangeMonth} />
      </Form.Item>
      <Form.Item name="year" label="Year" 
        rules={[
          { required: true,},]}>
        <DatePicker picker='year' onChange={onChangeYear} />
      </Form.Item>
      <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button type="primary" htmlType="submit">
              Make Payment
        </Button>
        </Form.Item>
      </Form>
          </Col>
        </Row>
      </div>
      }
    </div>  )
}

export default SalaryPaymentNew
import React, {useState, useEffect} from 'react'
import {
  Form,Input,Modal,Button,Breadcrumb,
  Card,Col,Row,DatePicker,Select} from 'antd'
import { 
  SearchOutlined
 } from '@ant-design/icons';
import axios from 'axios';

const AdvancesNew = () => {
  const [staff, setStaff] = useState({})
  const [searchResults, setSearchResults] = useState([])
  const [terms , setTerms] = useState([])
  const [xterm , setXTerm] = useState({id: ""})
  const [year,setYear] = useState(0)
  const [month,setMonth] = useState(0)

  const onChangeDateYear = (date,dateString) => {
    setYear(dateString)
  }
  const onChangeDateMonth = (date,dateString) => {
    setMonth(date._d.getMonth() + 1)
  }

  useEffect(() =>{
      axios.get("http://127.0.0.1:8000/basic/terms/").then((res) =>{
          setTerms(res.data)
      })
  },[])

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

  const onFinish = (values) => {
    if(xterm.id === ""){
      return Modal.error({title : "Select Term / Study Period"})
    }
    const advance_data = {
      staff_id : staff.id,
      term_id : xterm.id,
      year : Number(year),
      month: month,
      name: values.advance_for,
      amount : Number(values.amount),
    }
    console.log(advance_data)

    const url = "http://localhost:8000/finance/staff-advance-payment-record/add/"
    axios.post(url , advance_data, {
      headers: {
        "content-type" : "application/json" 
      }
    }).then(response => {
      return Modal.success({title : response.statusText})
      // return navigateToStudentDetail(response.data)
    }
      )
    .catch(error => 
      {
        console.log(error)
        return Modal.error({title : "Advance Already Exists Or Service Not Currently Available"})
      }) 
  };

  const onFinishFailed = (errorInfo) => {
    return (Modal.error({title : "Incomplete Data"}))
  };

  return (
    <div>
      <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Staff Advances</Breadcrumb.Item>
        <Breadcrumb.Item>New</Breadcrumb.Item>
        </Breadcrumb>    
      </div>
      <Form name="search"
        autoComplete="off"
        labelCol={{span: 4,}}
        wrapperCol={{span: 20,}}>
        <Form.Item name="name" label="Search Staff" 
          rules={[{ required: false,},]}>
          <Input prefix= {<SearchOutlined/>}
            placeholder = "Enter Staff Name OR Staff ID"
            onChange={(val) =>{
                if(val.target.value.trim().length >= 1){
                    getStafftData(val.target.value)
                }else{
                    setSearchResults([]) 
                }
            }}/>
        </Form.Item>
      </Form>
      { searchResults.length >= 1 && 
      <Row>
        <Col span={24}>
            {
            searchResults.map((result,index) => 
              <Card key={index}>
                <p>(Name){result.first_name} {result.last_name} - (ID)
                  {result.staff_id} - {result.phone_number}
                  <span
                  onClick= {
                      () => {
                          setStaff(result)
                          setSearchResults([]) 
                      }}
                  style={{ color: "green",marginLeft:"20px" }}>
                    Choose Staff Member</span>
                </p>
              </Card>)
            }
        </Col>
      </Row>}
      { staff.staff_id &&
      <div className="site-layout-content"
        style={{ 
          minHeight: "200px",
          padding: "24px",
          background: "#fff"
        }}>
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}>
              <div>
                <Form.Item name="year" label="Academic Year" 
                  rules={[{ required: true,},]}>
                  <DatePicker picker='year' onChange={onChangeDateYear} />
                </Form.Item>
                <Form.Item name="month" label="Month" 
                  rules={[{ required: true,},]}>
                  <DatePicker picker='month' onChange={onChangeDateMonth} />
                </Form.Item>
                <Form.Item name="period" label="Study Period">
                  <Select placeholder="select One"
                    onChange={(val)=> {
                      let obj = terms.find((item) => item.id === val)
                        setXTerm(obj)}}>
                      {terms.map((item,index) => 
                        <Select.Option key={index} value= {item.id} >{item.name} - {item.academic_year}</Select.Option>
                      )}
                  </Select>               
                </Form.Item>
              </div>
              <Form.Item name="advance_for" label="Advance For?" 
                rules={[{ required: true,},]}>
                  <Input placeholder="Advance Name Or Description" />
              </Form.Item>
              <Form.Item name="amount" label="Amount" 
                rules={[{ required: true,},]}>
                <Input placeholder="Amount" type="number" />
              </Form.Item>
              <Form.Item
                wrapperCol={{offset: 8,span: 16,}}>
                <Button type="primary" htmlType="submit">
                    Add Advance
                </Button>
              </Form.Item>
          </Form>
          </Col>
        </Row>
      </div>}
    </div>
  )
}

export default AdvancesNew
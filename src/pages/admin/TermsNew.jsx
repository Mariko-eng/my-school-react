import React, {useState } from 'react'
import {Form,Select,
  Button,Breadcrumb,DatePicker,Modal
} from 'antd'
import axios from 'axios';

const TermsNew = () => {
    const [acYr,setAcYr] = useState("")
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] = useState("")

    const onFinishFailed = (errorInfo) => {
        return (Modal.error({title : "Incomplete Data"}))
        };

    const onFinish = (values) => {
        const term_data  = {
        start_date : startDate,
        end_date : endDate, 
        name : values.term,
        academic_year : Number(acYr) 
      }
      const url = "http://localhost:8000/basic/terms/"
      axios.post(url , term_data, {
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
          return Modal.error({title : "Term Already Exists Or Service Not Currently Available"})
        }) 
    };

    const onChangeDate2 = (date,dateString) => {
        setAcYr(dateString)
    }

    const onChangeDate = (dates,dateStrings) => {
        setStartDate(dateStrings[0])
        setEndDate(dateStrings[1])
    }


  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Period Of Study</Breadcrumb.Item>
        <Breadcrumb.Item>Register</Breadcrumb.Item>
        </Breadcrumb>    
       </div>
      <div className="site-layout-content"
      style={{ 
        minHeight: "280px",
        padding: "24px",
        background: "#fff"
      }}
      >
      <Form name="control-hooks"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
      <Form.Item name="start-end" label="Start - End" 
        rules={[
          { required: true,},]}>
            <DatePicker.RangePicker onChange={onChangeDate}/>
      </Form.Item>
      <Form.Item name="year" label="Academic Year" 
        rules={[
          { required: true,},]}>
        <DatePicker picker='year' onChange={onChangeDate2} />
      </Form.Item>
      <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button type="primary" htmlType="submit">
              Add Term
        </Button>
        </Form.Item>
      </Form>
      </div>
    </div>  )
}

export default TermsNew
import React, { useEffect, useState } from 'react'
import {Form,Select,Input,Modal,Button,Breadcrumb,Card,Col,Row
  } from 'antd'
  import { 
    SearchOutlined
   } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const FeesTermPayment = () => {
    const [terms , setTerms] = useState([])
    const [xterm , setXTerm] = useState({})
    const [student, setStudent] = useState({})
    const [searchResults, setSearchResults] = useState([])

    const navigate = useNavigate()

    const navigateToPaymentDetail = (student) => {
      navigate("/home/finance/fees-term-payment-detail", { state: student });
    };

    useEffect(() =>{
        axios.get("http://127.0.0.1:8000/basic/terms/").then((res) =>{
            setTerms(res.data)
        })

        },[])

    const onFinish = (values) => {
        if(!xterm.name){
            return (Modal.error({title : "Incomplete Data"}))
        }
        const payment_data = {
            xstudent : student,
            xterm : xterm,
            amount_paid: values.amount,
            paid_by_name : values.paid_by_name,
            paid_by_phone: values.paid_by_phone
        }
        console.log(payment_data)
        const url = "http://localhost:8000/finance/fees-term-payment/"
        axios.post(url , payment_data, {
            headers: {
            "content-type" : "application/json" 
            }
        }).then(response => {
             Modal.success({title : response.statusText})
            return navigateToPaymentDetail(response.data)
        }
            )
        .catch(error => 
            {
            console.log(error)
            return Modal.error({title : "Failed To Make Payment, Try Again"})
            }) 

    };

    const onFinishFailed = (errorInfo) => {
        return (Modal.error({title : "Incomplete Data"}))
    };

    const getStudentData =(val) => {
        const url = `http://localhost:8000/basic/students-search/${val}/` 
        axios.get(url, {
          headers: {
            "content-type" : "application/json" 
          }
        }).then(response => {
            setSearchResults(response.data)
        //   return Modal.success({title : response.statusText}
        //     )
        })
        .catch(error => Modal.error({title : "Student Search Failed"}))
    }
      
  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>School Fees</Breadcrumb.Item>
        <Breadcrumb.Item>Make Payment</Breadcrumb.Item>
        </Breadcrumb>    
       </div>

       <Card>
       <Form name="search"
        autoComplete="off"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
       <Form.Item name="name" label="Search Student" 
        rules={[
          { required: false,},]}>
        <Input prefix= {<SearchOutlined/>}
            onChange={(val) =>{
                // setSearchTerm(val)
                if(val.target.value.trim().length >= 1){
                    getStudentData(val.target.value)
                }else{
                    setSearchResults([]) 
                }
            }}
        />
      </Form.Item>
      </Form>
      </Card>
      { searchResults.length >= 1 && 
      <Row>
        <Col span={24}>
            {
                searchResults.map((result,index) => 
                        <Card key={index}>
                        <p>(Name){result.first_name} {result.last_name} - (ID)
                        {result.student_id} - (Class)
                        {result.student_class.name}
                        <span
                            onClick= {
                                () => {
                                    setStudent(result)
                                    setSearchResults([]) 
                                }
                            }
                        style={{ color: "green",marginLeft:"20px" }}
                        >Choose Student</span>
                        </p>
                        </Card>
                    )
            }
        </Col>
      </Row>}
      {
        student.student_id && <div>
            <Row>
                <Col span={8}>
                <Card title="Student Details">
                    <p>First Name :<span>{student.first_name} {student.given_name}</span></p>
                    <p>First Name :<span>{student.last_name}</span></p>
                    <p>Student ID :<span>{student.student_id}</span></p>
                    <p>Class      :<span>{student.student_class.name}</span></p>
                </Card>
                </Col>
                <Col span={16}>
                <Form
                  name="control-hooks"
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
                <Row>
                    <Col span={24}>
                    <Form.Item name="period" label="Study Period"
                    labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}>
                        <Select
                        placeholder="select One"
                        onChange={(val)=> {
                        let obj = terms.find((item) => item.id === val)
                        setXTerm(obj)
                        }}
                        >
                        {terms.map((item,index) => 
                            <Select.Option key={index} value= {item.id} >{item.name} - {item.academic_year}</Select.Option>
                        )}
                        </Select>               
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Form.Item name="amount" label="Amount Paid"
                    rules={[
                    { required: true,},]}>
                         <Input type="number"/>               
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Form.Item name="paid_by_name" label="Paid By?"
                    rules={[
                    { required: true,},]}>
                         <Input 
                         placeholder='Name'
                         />               
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Form.Item name="paid_by_phone" label="Contact"
                    rules={[
                    { required: true,},]}>
                         <Input placeholder="Phone Number"/>               
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col offset={8}>
                    <Form.Item>
                    <Button
                    onClick = {
                        () =>{
                            setStudent({})
                        }
                    }>
                        Reset
                    </Button>
                </Form.Item>
                    </Col>
                    <Col offset={4}>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit Payment
                    </Button>
                </Form.Item>
                    </Col>
                </Row>
            </Form>
                </Col>
            </Row>
        </div>
      }
    </div>
  )
}

export default FeesTermPayment
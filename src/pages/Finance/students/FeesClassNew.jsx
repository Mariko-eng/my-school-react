import React, { useEffect, useState } from 'react'
import {Form,Select,
    Button,Breadcrumb,Modal,Col,Row
  } from 'antd'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const FeesClassNew = () => {
    const [classes , setClasses] = useState([])
    const [xclass , setXClass] = useState({name : ""})
    const [terms , setTerms] = useState([])
    const [xterm , setXTerm] = useState({name : ""})
    const [schoolfees , setSchoolFees] = useState([])
    const [xfees , setXFees] = useState([])

    const navigate = useNavigate()

    const navigateToClassFeesDetail = (student) => {
      navigate("/home/students-detail/", { state: student });
    };

    const submitFees = () => {
        if(xclass.name === ""){
            return Modal.error({title : "Choose Class"})
        }
        if(xterm.name === ""){
            return Modal.error({title : "Choose Study Period"})
        }
        let x = xfees
        if(x.length === 0){
            return Modal.error({title : "Add Fees"})
        }
        const fees_data = {
            xklass: xclass,
            xterm:xterm,
            fees:xfees
        }
        const url = "http://localhost:8000/finance/class-fees/register/"
        axios.post(url , fees_data, {
            headers: {
            "content-type" : "application/json" 
            }
        }).then(response => {
            Modal.success({title : response.statusText})
            return navigateToClassFeesDetail(xclass)
        }
            )
        .catch(error => 
            {
            console.log(error)
            return Modal.error({title : "Fee Already Exists Or Service Not Currently Available"})
            }) 
    }

    useEffect(() =>{
        axios.get("http://127.0.0.1:8000/basic/classes/").then((res) =>{
            setClasses(res.data)
        })

        },[])

    useEffect(() =>{
    axios.get("http://127.0.0.1:8000/basic/terms/").then((res) =>{
        setTerms(res.data)
    })

    },[])

    useEffect(() =>{
        axios.get("http://127.0.0.1:8000/finance/fees-list/").then((res) =>{
            setSchoolFees(res.data)
        })
    
        },[])

  return (
    <>
        <div>
            <Breadcrumb
            style={{
                    margin: '16px 0',
                }}>
                <Breadcrumb.Item>School Fees</Breadcrumb.Item>
                <Breadcrumb.Item>Add</Breadcrumb.Item>
            </Breadcrumb>    
        </div>
        <div className="site-layout-content"
            style={{ 
                minHeight: "200px",
                padding: "24px",
                background: "#fff"
            }}>
            <Form
                  name="control-hooks"
                  autoComplete="off"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}>
                <Row>
                    <Col span={24}>
                    <Form.Item label="Class"
                    labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    rules={[
                    { required: true,},]}>
                        <Select
                        placeholder="select One"
                        onChange={(val)=> {
                        let obj = classes.find((item) => item.id === val)
                        setXClass(obj)
                        }}
                        >
                        {classes.map((item,index) => 
                            <Select.Option key={index} value= {item.id} >{item.name}</Select.Option>
                        )}
                        </Select>               
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Form.Item label="Study Period"
                    labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    rules={[
                    { required: true,},]}>
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
                    <Form.Item label="Fees"
                    labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    rules={[
                    { required: true,},]}>
                        <Select
                                mode="multiple"
                        placeholder="select Term Fees"
                        onChange={(val)=> {
                            let objs =[]
                            val.forEach(id => {
                              let obj = schoolfees.find((item) => item.id === id)
                              objs.push(obj)
                            })
                            setXFees(objs)
                        }}
                        >
                        {schoolfees.map((item,index) => 
                            <Select.Option key={index} value= {item.id}>
                                {item.name} ({item.class_name}) 
                                ({item.amount})
                            </Select.Option>
                        )}
                        </Select>               
                    </Form.Item>
                    </Col>
                </Row>
                {/* <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button type="primary" htmlType="submit">
              Add To The List
        </Button>
        </Form.Item> */}
        </Form>
        </div>
        {xfees.length > 0 && 
        <div
        style={{marginTop:"10px"}}>
            {
                xfees.map((fee,index) => 
                <Row key={index}>
                <Col span={4}>
                {fee.type}
                </Col>  
                <Col span={4}>
                {fee.name}
                </Col>  
                <Col span={4}>
                {fee.amount}
                </Col>  
                </Row>
                )
            }
        </div>
        }
        {xfees.length > 0 && 
        <Button type="primary" style={{marginTop:"20px"}}
        onClick={ submitFees }
        >SUBMIT FEES</Button>
        }
        <div>
        </div>
    </>
  )
}

export default FeesClassNew
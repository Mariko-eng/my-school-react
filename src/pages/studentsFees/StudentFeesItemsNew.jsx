import React, { useEffect, useState } from 'react'
import {Form, Input,Select,
    Button,PageHeader,Modal,Col,Row
  } from 'antd'
import {useNavigate} from 'react-router-dom';
import axiosInstance from "../../utils/axios";

const StudentFeesItemsNew = () => {
    const [classes , setClasses] = useState([])
    const [xclass , setXClass] = useState({name : ""})
    const [studentFees , setStudentFees] = useState([])

    const navigate = useNavigate()

    const navigateToFeesDetail = (data) => {
      navigate("/home/admin/school-fees/detail/", { state: data });
    };

    const onFinish = (values) => {
        if(xclass.name === ""){
            return Modal.error({title : "Choose Class"})
        }
        const fees = studentFees
        const fees_data = {
            ...values,
        }
        fees_data.name = fees_data.name.toUpperCase()
        if(fees.length === 0){
            let v = []
            v.push(fees_data)
            setStudentFees(v)
        }else{
            let v = [...fees]

            let obj = v.find((fee) => fee.name === fees_data.name && fee.xClass === fees_data.xClass)
            if(!obj){
                v.push(fees_data)
                setStudentFees([...v]) 
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        return (Modal.error({title : "Incomplete Data"}))
    };

    useEffect(() =>{
        axiosInstance.get("http://127.0.0.1:8000/basic/classes/").then((res) =>{
          setClasses(res.data)
        })
    
      },[])

const submitFees = () => {
    const data = {
        fees: studentFees,
        xclass : xclass,

    }
    const url = "http://localhost:8000/finance/fees-register/"
    axiosInstance.post(url , data, {
        headers: {
        "content-type" : "application/json" 
        }
    }).then(response => {
         Modal.success({title : response.statusText})
        return navigateToFeesDetail(xclass)
    }
        )
    .catch(error => 
        {
        console.log(error)
        return Modal.error({title : "Fee Already Exists Or Service Not Currently Available"})
        }) 
}

  return (
    <>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="School Fees Structure Items"
          subTitle="Add New"
        ></PageHeader>
      </div>
      <br />
        <div className="site-layout-content"
            style={{ 
                minHeight: "280px",
                padding: "24px",
                background: "#fff"
            }}>
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
                    <Form.Item name="type" label="Fee Type"
                    labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    rules={[
                    { required: true,},]}>
                        <Select
                            placeholder="select One">
                            <Select.Option value= "STANDARD" >STANDARD</Select.Option>
                            <Select.Option value= "FUNCTIONAL" >FUNCTIONAL</Select.Option>
                            <Select.Option value= "EXTRA" >EXTRA</Select.Option>
                            <Select.Option value= "EMERGENCY" >EMERGENCY</Select.Option>
                        </Select>                
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item name="xclass" label="Select Class"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 20,
                            }}
                            rules={[{ required: false,},]}>
                                <Select
                                    placeholder="select One"
                                    onChange={(val)=> {
                                    let obj = classes.find((item) => item.id === val)
                                    setXClass(obj)
                                    }}>
                                    {classes.map((item,index) => 
                                        <Select.Option key={index} value= {item.id} >{item.name}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Form.Item name="name" label="Fee Name"
                    labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    rules={[
                    { required: true,},]}>
                        <Input />              
                    </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <Form.Item name="amount" label="Fee Amount"
                    labelCol={{
                        span: 4,
                      }}
                      wrapperCol={{
                        span: 20,
                      }}
                    rules={[
                    { required: true,},]}>
                        <Input type="number" />              
                    </Form.Item>
                    </Col>
                </Row>
                <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button type="primary" htmlType="submit">
              Add To The List
        </Button>
        </Form.Item>
            </Form>
        </div>
        {studentFees.length > 0 && 
        <div
        style={{marginTop:"10px"}}>
            {
                studentFees.map((fee,index) => 
                <Row key={index}>
                <Col span={4} style={ {color:"red"}}>
                    <div onClick={() => {
                        const existingFee = studentFees.find((item) => item.name === fee.name)
                        if(existingFee){
                            const newFees = studentFees.filter((item) => 
                            item.name !== fee.name)
                            setStudentFees(newFees)
                        }
                    }}>
                    (-)Remove
                    </div>
                </Col>  
                <Col span={4}>
                {fee.type}
                </Col>  
                <Col span={4}>
                {fee.name}
                </Col>   
                <Col span={4}>
                <Input value={fee.amount}
                placeholder='Amount'
                onChange={(e) => {
                    let itm = studentFees.find((f) => f.name === fee.name)
                    itm.amount = e.target.value
                    const newFees = studentFees.map(f => {
                        if(itm.name === f.name) return itm;
                        return f
                    })
                    setStudentFees(newFees)
                }}
                />
                </Col> 
                </Row>
                )
            }
        </div>
        }
        {studentFees.length > 0 && 
        <Button type="primary" style={{marginTop:"20px"}}
        onClick={ submitFees }
        >SUBMIT FEES</Button>
        }
        <div>
        </div>
    </>
  )
}

export default StudentFeesItemsNew
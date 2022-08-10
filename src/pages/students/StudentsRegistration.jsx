import React, { useEffect, useState } from 'react'
import {Form, Input,Select,
  Button,Breadcrumb,DatePicker,Radio,Modal
} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const StudentsRegistration = () => {
  const [classes , setClasses] = useState([])
  const [xClass , setXClass] = useState([])
  const [gname , setGname] = useState("")
  const [date,setDate] = useState("")
  const [prevSkul , setPrevSkul] = useState("")
  const [prevClass , setPrevClass] = useState("")
  const [isDisabled , setIsDisabled] = useState(false)
  const [disability , setDisability] = useState("")
  const [hobbies , setHobbies] = useState("")
  const [foods , setFoods] = useState("")

  const navigate = useNavigate()

  const navigateToParentInfo = (student) => {
    navigate("/home/students/parents/new/", { state: student });
  };

  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/basic/classes/").then((res) =>{
      setClasses(res.data)
    })

  },[])

  const onFinishFailed = (errorInfo) => {
    return (Modal.error({title : "Incomplete Data"}))
    };
  const onChangeDate = (date,dateString) => {
    setDate(dateString)
  }

  const onFinish = (values) => {
    var student_data = {
      first_name: values.first_name,
      last_name: values.last_name,
      given_name: gname,
      xklass: xClass,
      date_of_birth:date,
      gender : values.gender,
      previous_school : prevSkul,
      previous_school_class : prevClass,
      nationality: values.nationality,
      religion: values.religion,
      is_baptised : values.is_baptised,
      has_a_disability: values.has_a_disability,
      disabilities: disability,
      hobbies_or_skills: hobbies,
      food_dislikes: foods,
    }
    navigateToParentInfo(student_data)
  }

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
        <Breadcrumb.Item>Registration</Breadcrumb.Item>
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
        <Form.Item
        wrapperCol={{ offset: 8,
        span : 16}}
        style={{
          background: "cornsilk"
        }}
        >
          Register New Student
        </Form.Item>
       <Form.Item name="first_name" label="First Name" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="last_name" label="Last Name" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name= "given_name" label="Given Name" 
        rules={[
          { required: false,},]}>
        <Input 
        onChange={(val)=> {
          setGname(val.target.value)
        }}
        />
        </Form.Item>
      <Form.Item label="Select Class"
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
      <Form.Item name="date_of_birth" label="Date Of Birth" 
        rules={[
          { required: true,},]}>
        <DatePicker onChange={onChangeDate} />
      </Form.Item>
      <Form.Item name="gender" label="Gender" 
        rules={[
          { required: true,},]}>
        <Radio.Group>
          <Radio value={"Male"} >Male</Radio>
          <Radio value={"Female"} >Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="previous_school" label="Previous School" 
        rules={[
          { required: false,},]}>
        <Input 
         onChange={(val)=> {
          setPrevSkul(val.target.value)
        }}
        />
      </Form.Item>
      <Form.Item label="Previous Class"
      onChange={(val)=> {
        setPrevClass(val.target.value)
      }}
      rules={[
        { required: true,},]}>
        <Select
        placeholder="select One"
        >
          <Select.Option value= "Primary 1" >Primary 1</Select.Option>
          <Select.Option value= "Primary 2" >Primary 2</Select.Option>
          <Select.Option value= "Primary 3" >Primary 3</Select.Option>
          <Select.Option value= "Primary 4" >Primary 4</Select.Option>
          <Select.Option value= "Primary 5" >Primary 5</Select.Option>
          <Select.Option value= "Primary 6" >Primary 6</Select.Option>
          <Select.Option value= "Pre-Primary" >Pre-Primary</Select.Option>
          <Select.Option value= "None Of The Above" >None Of The Above</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="nationality" label="Nationality"
      initialValue = "Ugandan" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="religion" label="Religion"
      rules={[
        { required: true,},]}>
        <Select placeholder="select One">
          <Select.Option value= "Catholic" >Catholic</Select.Option>
          <Select.Option value= "Protestant" >Protestant</Select.Option>
          <Select.Option value= "Islam" >Islam</Select.Option>
          <Select.Option value= "SDA" >SDA</Select.Option>
          <Select.Option value= "Pentecostal" >Pentecostal</Select.Option>
          <Select.Option value= "None Of The Above" >None Of The Above</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="is_baptised" label="Is Baptised?" 
        rules={[
          { required: true,},]}>
        <Radio.Group>
          <Radio value={true} >Yes</Radio>
          <Radio value={false} >No</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="has_a_disability" label="Has A Disability?" 
      initialValue={ isDisabled }
        rules={[
          { required: true,},]}
          onChange={(val) => {
            setIsDisabled((preVal => !preVal))
          }}
          >
        <Radio.Group>
          <Radio value={true} >Yes</Radio>
          <Radio value={false} >No</Radio>
        </Radio.Group>
      </Form.Item>

      { isDisabled &&
      <Form.Item
          label="Disabilities" 
          rules={[{
            required: false, message: 'Disability',},]}>
          <Input.TextArea showCount maxLength={1000} 
          onChange={(val)=> {
            setDisability(val.target.value)
          }}
          />
        </Form.Item>
        }
        <Form.Item
          label="Hobbies/Extra Skills" 
          rules={[{
            required: false, message: 'Hobbies',},]}>
          <Input.TextArea showCount maxLength={1000} 
          onChange={(val)=> {
            setHobbies(val.target.value)
          }}
          />
        </Form.Item>
        <Form.Item
          label="Food Dislikes" 
          rules={[{
            required: false, message: 'Forbidden Foods',},]}>
          <Input.TextArea showCount maxLength={1000} 
          onChange={(val)=> {
            setFoods(val.target.value)
          }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button type="primary" htmlType="submit">
              Continue To Add Parent Data
        </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}

export default StudentsRegistration
import React, { useEffect, useState } from 'react'
import {
  Form, Input,Select,Button,
  Breadcrumb,DatePicker,Radio,Modal
} from 'antd'
import { FolderAddOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from 'axios';

const NonTeachingRegistration = () => {
  const [roles , setRoles] = useState([])
  const [xRoles , setXRoles] = useState([])
  const [gname , setGname] = useState("")
  const [email , setEmail] = useState("")
  const [date,setDate] = useState("")
  const [nationalId , setNationalId] = useState("")
  const [prevWorkPlace , setPrevWorkPlace] = useState("")
  const [isDisabled , setIsDisabled] = useState(false)
  const [disability , setDisability] = useState("")
  const [hobbies , setHobbies] = useState("")
  const [foods , setFoods] = useState("")

  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/auth/staff/roles/").then((res) =>{
      setRoles(res.data[0].groups)
    })

  },[])

  const onFinish = (values) => {
    var teacher_data = {
      first_name: values.first_name,
      last_name: values.last_name,
      given_name: gname,
      phone_number: values.phone_number,
      email: email,
      date_of_birth:date,
      gender : values.gender,
      nationality: values.nationality,
      national_id: nationalId,
      religion: values.religion,
      profession: values.profession,
      previous_work_place: prevWorkPlace,
      experience: values.experience,
      home_address_district: values.home_address_district,
      home_address_village: values.home_address_village,
      has_a_disability: values.has_a_disability,
      disabilities: disability,
      hobbies_or_skills: hobbies,
      food_dislikes: foods,
      is_teacher: false,
      xroles: xRoles, 
    }
    console.log(teacher_data);

    const url = "http://localhost:8000/basic/non-teaching-staff/"
    axios.post(url , teacher_data, {
      headers: {
        "content-type" : "application/json" 
      }
    }).then(response => Modal.success({title : response.statusText}))
    .catch(error => 
      {
        console.log(error)
        return Modal.error({title : "Staff Already Exists Or Service Not Currently Available"})
      })

  };

const onFinishFailed = (errorInfo) => {
  return (Modal.error({title : "Incomplete Data"}))
  };
const onChangeDate = (date,dateString) => {
  // console.log(dateString)
  // console.log(date)
  setDate(dateString)
}

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Staff</Breadcrumb.Item>
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
          New Staff Registration
        </Form.Item>
       <Form.Item name= "first_name" label="First Name" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name= "last_name" label="Last Name" 
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
      <Form.Item name="phone_number" label="Phone Number" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" 
        rules={[
          { required: false,},]}>
        <Input 
        onChange={(val)=> {
          setEmail(val.target.value)
        }}
        />
      </Form.Item>
      
      <Form.Item label="Select Staff Roles"
        rules={[
          { required: false,},]}>
        <Select
        mode="multiple"
        placeholder="select One Or More"
        onChange={(val)=> {
          let objs =[]
          val.forEach(id => {
            let obj = roles.find((item) => item.id === id)
            objs.push(obj)
          })
          setXRoles(objs)
        }}
        >
          {roles.map((item,index) => 
            <Select.Option key={index} value= {item.id} >{item.name}</Select.Option>
          )}
        </Select>
        <div style={{color:"blue"}} >
        <Link to="#"
                style={{ color:"blue" }}
        >Add Role</Link>
          <span style={{ marginLeft : "5px",color:"green" }}><FolderAddOutlined/></span></div>
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
      <Form.Item name="nationality" label="Nationality" 
      initialValue = "Ugandan"
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="national_id" label="National ID" 
        rules={[
          { required: false,},]}>
        <Input 
        onChange={(val)=> {
          setNationalId(val.target.value)
        }}
        />
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
      <Form.Item name="profession" label="Profession" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="previous_work_place" label="Previous Work Place" 
        rules={[
          { required: false,},]}>
        <Input 
        onChange={(val)=> {
          setPrevWorkPlace(val.target.value)
        }}
        />
      </Form.Item>
      <Form.Item name="experience" label="Experience" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="home_address_district" label="Home District" 
        rules={[
          { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name="home_address_village" label="Home Village" 
        rules={[
          { required: true,},]}>
        <Input />
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
            required: false, message: 'Hobbies/Extra Skills',},]}>
          <Input.TextArea showCount maxLength={1000} 
          onChange={(val)=> {
            setHobbies(val.target.value)
          }}
          />
        </Form.Item>
        <Form.Item
          label="Food Dislikes" 
          rules={[{
            required: false, message: 'Food Dislikes',},]}>
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
              Submit
        </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}

export default NonTeachingRegistration
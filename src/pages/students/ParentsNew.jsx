import React, {useState } from 'react'
import {Form, Input,
  Button,Breadcrumb,Radio,Row,Col,Card,Space,Select,Modal
} from 'antd'
import {useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios';

const ParentsNew = () => {
  const location = useLocation()
  const {state} = location
  const student_data = state;

  const [hasAguardian , setHasAguardian] = useState(false)
  const [guardainFirstName , setGuardainFirstName] = useState("")
  const [guardainLastName , setGuardainLastName] = useState("")
  const [guardainTelephone , setGuardainTelephone] = useState("")
  const [guardainEmail , setGuardainEmail] = useState("")
  const [guardainProfession , setGuardainProfession] = useState("")
  const [guardainWorkPlace , setGuardainWorkPlace] = useState("")
  const [guardainNationality , setGuardainNationality] = useState("")

  const navigate = useNavigate()

  const navigateToStudentDetail = (student) => {
    navigate("/home/students-detail/", { state: student });
  };

  const onFinish = (values) => {
    console.log(values);
    const parent_data  = {
    father_first_name : values.father_first_name,
    father_last_name : values.father_last_name, 
    father_phone_number : values.father_phone_number, 
    father_email : values.father_email, 
    father_profession : values.father_profession,
    father_work_place : values.father_work_place,
    father_nationality : values.father_nationality, 
    is_father_alive : values.is_father_alive, 
    mother_first_name : values.mother_first_name,
    mother_last_name : values.mother_last_name,
    mother_phone_number : values.mother_phone_number,
    mother_email : values.mother_email, 
    mother_profession : values.mother_profession, 
    mother_work_place : values.mother_work_place,
    mother_nationality : values.mother_nationality,
    is_mother_alive : values.is_mother_alive,
    guardain_first_name : guardainFirstName,
    guardain_last_name : guardainLastName ,
    guardain_phone_number : guardainTelephone,
    guardian_email : guardainEmail,
    guardian_nationality : guardainNationality,
    guardian_work_place : guardainWorkPlace,
    guardian_profession : guardainProfession,
    contact_nationalId_name : values.contact_nationality,
    contact_national_id : values.contact_national_id,
    contact_nationality_relation : values.contact_nationality_relation,
    home_address_district : values.home_address_district,
    home_address_village : values.home_address_village
  }
  const data = {
    ...student_data,
    parents_info : parent_data
  }
  const url = "http://localhost:8000/basic/students/register/"
  axios.post(url , data, {
    headers: {
      "content-type" : "application/json" 
    }
  }).then(response => {
    Modal.success({title : response.statusText})
    return navigateToStudentDetail(response.data)
  }
    )
  .catch(error => 
    {
      console.log(error)
      return Modal.error({title : "Student Already Exists Or Service Not Currently Available"})
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
        <Breadcrumb.Item>Students</Breadcrumb.Item>
        <Breadcrumb.Item>Registration</Breadcrumb.Item>
        <Breadcrumb.Item>Parent Information</Breadcrumb.Item>
        </Breadcrumb>    
       </div>
      <div className="site-layout-content"
      style={{ 
        minHeight: "280px",
        padding: "24px",
        background: "#fff"
      }}
      >
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
        <Form.Item
        wrapperCol={{ offset: 8,
        span : 16}}
        style={{
          background: "cornsilk"
        }}
        >
          Enter Parents Information
        </Form.Item>
        <Space 
          direction="vertical"
          size="middle"
          style={{display: 'flex', }}
          >
          <Card title = "Father">
            <Row style={{ width : "100%"}}>
              <Col span={12}>
                <Form.Item name="father_first_name" label="First Name"
                wrapperCol={{
                  span : 16}} 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="father_last_name" label="Last Name" 
                wrapperCol={{
                  span : 16}} 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="father_phone_number" label="Phone Number" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="father_email" label="Email" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="father_profession" label="Profession" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="father_work_place" label="Work Place" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="father_nationality" label="Nationailty" 
                initialValue="Ugandan" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="is_father_alive" label="Is Alive??" 
                  rules={[
                    { required: true,},]}>
                  <Radio.Group>
                    <Radio value={true} >Yes</Radio>
                    <Radio value={false} >No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card> 
          
          <Card title = "Mother">
            <Row>
              <Col span={12}>
                <Form.Item name="mother_first_name" label="First Name" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="mother_last_name" label="Last Name" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="mother_phone_number" label="Phone Number" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="mother_email" label="Email" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="mother_profession" label="Profession" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="mother_work_place" label="Work Place" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="mother_nationality" label="Nationailty"
                initialValue="Ugandan"  
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="is_mother_alive" label="Is Alive??" 
                  rules={[
                    { required: true,},]}>
                  <Radio.Group>
                    <Radio value={true} >Yes</Radio>
                    <Radio value={false} >No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card> 

          <Form.Item  name="hasAguardian" label="Has A Guardian?" 
            initialValue={ hasAguardian }
              rules={[
                { required: true,},]}
                onChange={(val) => {
                  setHasAguardian((preVal => !preVal))
                }}
                >
              <Radio.Group>
                <Radio value={true} >Yes</Radio>
                <Radio value={false} >No</Radio>
              </Radio.Group>
            </Form.Item>

            { hasAguardian &&
          <Card title = "Guardian">
            <Row>
              <Col span={12}>
                <Form.Item name="guardain_first_name" label="First Name" 
                  rules={[
                    { required: false,},]}>
                  <Input 
                  onChange={(val)=> {
                    setGuardainFirstName(val.target.value)
                  }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="guardain_last_name" label="Last Name" 
                  rules={[
                    { required: false,},]}>
                  <Input 
                  onChange={(val)=> {
                    setGuardainLastName(val.target.value)
                  }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="guardain_phone_number" label="Phone Number" 
                  rules={[
                    { required: false,},]}>
                  <Input 
                  onChange={(val)=> {
                    setGuardainTelephone(val.target.value)
                  }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="guardian_email" label="Email" 
                  rules={[
                    { required: false,},]}>
                  <Input 
                  onChange={(val)=> {
                    setGuardainEmail(val.target.value)
                  }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="guardian_profession" label="Profession" 
                  rules={[
                    { required: false,},]}>
                  <Input 
                  onChange={(val)=> {
                    setGuardainProfession(val.target.value)
                  }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="guardian_work_place" label="Work Place" 
                  rules={[
                    { required: false,},]}>
                  <Input 
                  onChange={(val)=> {
                    setGuardainWorkPlace(val.target.value)
                  }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="guardian_nationality" label="Nationailty"
                initialValue="Ugandan" 
                  rules={[
                    { required: false,},]}>
                  <Input 
                  onChange={(val)=> {
                    setGuardainNationality(val.target.value)
                  }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card> }

          <Card title = "National ID Details">
            <Row>
              <Col span={12}>
                <Form.Item name="contact_nationalId_name" label="Owner" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="contact_national_id" label="ID Number" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
            <Col span={12}>
            <Form.Item name="contact_nationality" label="Nationailty"
                initialValue="Ugandan" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="contact_nationality_relation" label="Student Relation"
                  rules={[
                    { required: true,},]}>
                    <Select placeholder="select One">
                      <Select.Option value= "Catholic" >Father</Select.Option>
                      <Select.Option value= "Protestant" >Mother</Select.Option>
                      <Select.Option value= "Islam" >Guardian</Select.Option>
                      <Select.Option value= "SDA" >Relative</Select.Option>
                    </Select>
                  </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="home_address_district" label="Home District" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="home_address_village" label="Home Village" 
                  rules={[
                    { required: true,},]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card> 
        </Space> 

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        <Button type="primary" htmlType="submit">
              SUBMIT
        </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}

export default ParentsNew
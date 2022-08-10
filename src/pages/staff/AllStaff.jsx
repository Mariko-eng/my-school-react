import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Table, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AppBreadcrumb } from '../../components'

const AllStaff = () => {
  const [staff, setStaff] = useState([])
  const navigate = useNavigate()

  const navigateToTeacherDetail = (detail) => {
    navigate("/home/staff/non-teaching-staff-detail/", { state: detail });
  };

  const getStaff = () => {
    const url = 'http://127.0.0.1:8000/basic/staff/';
    axios.get(url).then(res => {
      const { data } = res
      setStaff(data)
    })
  }
  useEffect(() =>{
    getStaff()
  },[])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'staff_id',
      key: 'staff_id',
      render: (text) => <Link to="">{text}</Link>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (_, record) => (
          <div >
            {record.first_name} {record.given_name}
          </div>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Profession',
      dataIndex: 'profession',
      key: 'profession',
    },
    
    {
      title: 'Religion',
      key: 'religion',
      dataIndex: 'religion',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space key={record.id}
        size="middle">
          <Link to=""
          style={{ color: "blue"}}
          >View</Link>
          <div 
          onClick={() => { navigateToTeacherDetail(record) }}
          style={{ color: "red"}}>
            Edit
          </div>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div>
        <AppBreadcrumb title="Teachers" action1="All" />
        <div style={{ 
          marginTop : "20px"
        }}>
        <Table columns={columns} dataSource={staff}/>
       </div>
      </div>
    </>
  )
}

export default AllStaff
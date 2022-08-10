import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Table, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AppBreadcrumb } from '../../components'

const StudentsList = () => {
  const [students, setStudents] = useState([])

  const navigate = useNavigate()

  const navigateToTeacherDetail = (detail) => {
    navigate("/home/staff/students-detail/", { state: detail });
  };

  const getStaff = () => {
    const url = 'http://127.0.0.1:8000/basic/students/';
    axios.get(url).then(res => {
      const { data } = res
      setStudents(data)
      // console.log(data[0].student_class.name)
    })
  }
  useEffect(() =>{
    getStaff()
  },[])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'student_id',
      key: 'student_id',
      render: (text) => <Link to="">{text}</Link>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Class',
      dataIndex: 'student_class',
      key: 'student_class',
      render: (_,record) => 
      <div>{record.student_class.name}</div>  
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
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
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
        <Space size="middle">
          <Link to=""
          style={{ color: "blue"}}
          >View
          </Link>
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
        <AppBreadcrumb title="Students" action1="All" />
        <div style={{ 
          marginTop : "20px"
        }}>
        <Table columns={columns} dataSource={students}/>
       </div>
      </div>
    </>
  )
}

export default StudentsList
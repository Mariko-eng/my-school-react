import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Table, Space,Modal } from 'antd'
import { AppBreadcrumb } from '../../../components'

const FeesTermPaymentList = () => {
  const [classfees , setClassFees] = useState([])
  const [classData , setClassData] = useState(null)
  const [visible, setVisible] = useState(false); 

  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/finance/fees-term-payment-list/").then((res) =>{
      setClassFees(res.data)
    })

    },[])

      
  const editProduct = (record) => { 
    setVisible(true); 
    setClassData(record);
  }; 

    const columns = [
    {
        title: 'Student ID',
        key: 'Student_id',
        render: (_,record) => 
        <div>{record.student.student_id}</div>  
          },
      {
        title: 'Student',
        key: 'Student',
        render: (_,record) => 
        <div>{record.student.first_name}</div>  
      },
      {
        title: 'Class',
        key: 'class',
        render: (_,record) => 
        <div>{record.class_name}</div>  
      },
      {
        title: 'Study Period',
        key: 'term_name',
        render: (_, record) => (
            <div >
              {record.term.name}
            </div>
        ),
      },
      {
        title: 'Academic Year',
        key: 'term_year',
        render: (_, record) => (
            <div >
              {record.term.academic_year}
            </div>
        ),
      },
      {
        title: 'Start Date',
        key: 'term_start_date',
        render: (_, record) => (
            <div >
              {record.term.start_date}
            </div>
        ),
      },
      {
        title: 'End Date',
        key: 'term_end_date',
        render: (_, record) => (
            <div >
              {record.term.end_date}
            </div>
        ),
      },
      {
        title: 'Term Fees',
        key: 'term_class_fees_total',
        render: (_, record) => (
            <div>
              {record.term_class_fees_total} SHS
            </div>
        ),
      },
      {
        title: 'Amount Paid',
        key: 'amount_paid',
        render: (_, record) => (
            <div>
              {record.amount_paid} SHS
            </div>
        ),
      },
      {
        title: 'Date Paid',
        key: 'date_created',
        render: (_, record) => (
            <div>
              {record.date_created}
            </div>
        ),
      },
      {
        title: 'Balance',
        key: 'balance',
        render: (_, record) => (
            <div>
              {record.term_class_fees_total - record.amount_paid} SHS
            </div>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <div  onClick={() => editProduct(record)}
            style={{ color: "blue"}}>
              Edit
            </div>
            <div  onClick={() => editProduct(record)}
            style={{ color: "red"}}>
              Delete
            </div>
          </Space>
        ),
      },
    ];
  
    return (
      <>
        <div>
          <AppBreadcrumb title="School Fees Payment" action1="All" />
          <div style={{ 
            marginTop : "20px"
          }}>
          <Table columns={columns} dataSource={classfees}/>
         </div>
        </div>
        { visible &&
         <Modal 
            title= {classData.class_name} 
            visible={visible} 
            onCancel={() => setVisible(false)} 
            onOk={() => setVisible(false)} 
            okText="OK" 
            >
              <p>Fees</p>
              {classData.fees.map((item,index) => 
              <p key={index}><span>{item.name}</span> <span>{item.amount}</span></p>)}
              <br/>
              <p><span>Total</span> <span>{classData.total_fees}</span>SHS</p>
          </Modal>
          }
      </>
    )
}

export default FeesTermPaymentList
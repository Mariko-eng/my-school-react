import React from 'react'
// import { useState } from 'react'
import { AppBreadcrumb } from '../components'
import { Row, Col,Card,Space } from 'antd'
// import { Modal } from 'antd'
// import { handleModal } from '../store/modalSlice'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'  


const Dashbaord = () => {
  // const [data, setData] = useState({});
  // const { isDrawerOpen } = useSelector((store) => store.modal)
  // const dispatch = useDispatch()
  
  return (
    <>
      <div>
        <AppBreadcrumb title="Dashboard" action1="Summary" />
        <Row>
          <Col span = {6}>
            <Card>Classes</Card>
            </Col>
            <Col span = {6}>
            <Card>Students</Card>
            </Col>
            <Col span = {6}>
            <Card>Teachers</Card>
            </Col>
            <Col span = {6}>
            <Card>Non Teaching Staff</Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashbaord
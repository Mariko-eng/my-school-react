import React from 'react'
import { useLocation } from "react-router-dom";

const StudentsDetail = () => {
  const location = useLocation()
  const {state} = location
  const {detail,type} = state;
  console.log(detail)
  console.log(type)

  return (
    <>
      <p>StudentsDetail</p>
      <p> {detail.student_id }</p>
    </>
  )
}

export default StudentsDetail
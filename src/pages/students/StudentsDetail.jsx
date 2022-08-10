import React from 'react'
import { useLocation } from "react-router-dom";

const StudentsDetail = () => {
  const location = useLocation()
  const {state} = location
  const data = state;
  console.log(data)

  return (
    <>
      <p>StudentsDetail</p>
      <p> {data.student_id }</p>
    </>
  )
}

export default StudentsDetail
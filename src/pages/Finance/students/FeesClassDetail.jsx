import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";

const FeesClassDetail = () => {
  const location = useLocation()
  const {state} = location
  const data = state;
  console.log(data)

  useEffect(() => {
    
  },
  [])

  return (
    <>
      <p> Class Fees</p>
      <p> {data.name }</p>
      <p> {data.amount }</p>
    </>
  )
}

export default FeesClassDetail
import React from 'react'
import { useLocation } from "react-router-dom";
// import { AppBreadcrumb } from '../../../components'

const TeachersDetail = () => {
    const location = useLocation()
    const {state} = location
    console.log(state)
    // const data = state;

  return (
    <div>
        {/* <AppBreadcrumb title="Teacher Detail" action1={data.first_name.toUpperCase()} /> */}
    </div>
  )
}

export default TeachersDetail
import React from 'react'
import { useLocation } from "react-router-dom";
import { AppBreadcrumb } from '../../../components'

const NonTeachingDetail = () => {
    const location = useLocation()
    const {state} = location
    const data = state;

  return (
    <div>
        <AppBreadcrumb title="Non-Teaching Staff Detail" action1={data.first_name.toUpperCase()} />
    </div>
  )
}

export default NonTeachingDetail
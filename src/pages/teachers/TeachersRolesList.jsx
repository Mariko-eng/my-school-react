import React, {useEffect,useState} from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';
import axiosInstance from "../../utils/axios";

const TeachersRolesList = () => {
  const [roles , setRoles] = useState([])

  useEffect(() =>{
    axiosInstance.get("users/roles/teachers/").then((res) =>{
      // console.log(res.data)
      setRoles(res.data[0].groups)
    })

  },[])
 
  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Staff Roles</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/home/admin/staff-roles/new/" style={{ color: "blue"}}>
            Add
          </Link>
        </Breadcrumb.Item> 
       </Breadcrumb>    
       </div>
      <div className="site-layout-content"
      style={{ 
        minHeight: "280px",
        padding: "24px",
        background: "#fff"
      }}
      >
     { roles.map((item,index) => <div key={index}>
          <p>{item.id} {item.name} {item.role_id}</p>
        </div> )}
      </div>
    </div>
  )
}

export default TeachersRolesList
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, PageHeader, Input } from "antd";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";

const OtherStaffRolesList = () => {
  const navigate = useNavigate();

  const [roles , setRoles] = useState([])

  useEffect(() =>{
    axiosInstance.get("users/roles/other-staff/").then((res) =>{
      setRoles(res.data[0].groups)
    })

  },[])
 
  return (
    <div>
        <div>
          <PageHeader
            ghost={false}
            onBack={() => navigate(-1)}
            title="Non-Teaching Staff Roles"
            subTitle="List"
            extra={[
              <Input
                key="3"
                size="small"
                placeholder="search"
                prefix={<SearchOutlined />}
              />,
              <PrinterOutlined key="2" color="blue" />,
              <Button key="1" type="primary">
                <Link to="new">+ New</Link>
              </Button>,
            ]}
          ></PageHeader>
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

export default OtherStaffRolesList
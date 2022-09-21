import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Button,
  Input,
} from "antd";
import Select from "react-select";
import Creatable from "react-select/creatable";
import AsyncSelect from "react-select/async";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const Permissions = () => {
  const navigate = useNavigate();
  const [perms, setPerms] = useState([]);
  const [xclass, setXclass] = useState({ label: "", value: "" })

  const aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" },
  ];

  const loadOptions = async (inputValue, callback) => {
    // perform a request
    const requestResults = await axiosInstance.get('basic/classes/')

    const {data}  =requestResults
    const options = [];
    data.forEach((item) => {
      options.push({ label: item.name, value: item.id })
      // console.log(item)
    })
  
    // return requestResults
    return options
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/auth/content-types/perms/").then((res) => {
      setPerms(res.data);
    });
  }, []);

  return (
    <div>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Admins"
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
              + New
            </Button>,
          ]}
        ></PageHeader>
      </div>
      <div>
        <Select
          options={aquaticCreatures}
          onChange={(opt) => console.log(opt.label, opt.value)}
          isMulti
        />
        <Creatable
          options={aquaticCreatures}
          onChange={(opt, meta) => console.log(opt, meta)}
        />
        <AsyncSelect 
        defaultOptions
        cacheOptions
        loadOptions={loadOptions} 
          onChange={(opt, meta) => {
            console.log(opt, meta)
            return setXclass(opt)
          }}
        />
      </div>
      {xclass.label}
      {/* <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>System Permissions</Breadcrumb.Item>
        <Breadcrumb.Item>
          Edit
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
          { perms.map((item,index) => 
          <div key={index}>
            <Space
              direction="vertical"
              size="middle"
             style={{display: 'flex', }}
              >
              <Card title = {item.name}>
                <Row                 >
                  { item.permissions.map((perm,index2) => 
                  <Col span={6} key={index2}>{perm.name}</Col>) }
                </Row>
              </Card>
            </Space>
          </div> 
        )}
      </div> */}
    </div>
  );
};

export default Permissions;

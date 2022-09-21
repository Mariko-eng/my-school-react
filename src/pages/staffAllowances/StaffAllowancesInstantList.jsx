import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, PageHeader } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StaffAllowancesInstantList = () => {
  const [xStaff, setXStaff] = useState({ label: "", value: "" });
  const navigate = useNavigate();

  const loadOptionsStaff = async (inputValue, callback) => {
    // perform a request
    const requestResults = await axiosInstance.get(
      `students/search/${inputValue}/`
    );

    const { data } = requestResults;
    const options = [];
    data.forEach((item) => {
      options.push({
        label: item.last_name + " " + item.first_name,
        value: item.id,
      });
      // console.log(item)
    });

    // return requestResults
    return options;
  };

  return (
    <div>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Instant Allowances"
          subTitle="List"
          extra={[
            <div style={{ width: "250px" }}>
              <AsyncSelect
                placeholder="Select Staff"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsStaff}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStaff(opt);
                }}
              />
            </div>,
            <PrinterOutlined key="2" color="blue" />,
            <Button key="1" type="primary">
              <Link to="new">+ New</Link>
            </Button>,
          ]}
        ></PageHeader>
      </div>
    </div>
  );
};

export default StaffAllowancesInstantList;

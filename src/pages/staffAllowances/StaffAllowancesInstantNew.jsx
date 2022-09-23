import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageHeader,
} from "antd";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../utils/axios";

const StaffAllowancesInstantNew = () => {
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
            subTitle="New"
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
            ]}
          ></PageHeader>
        </div>
    </div>
  )
}

export default StaffAllowancesInstantNew
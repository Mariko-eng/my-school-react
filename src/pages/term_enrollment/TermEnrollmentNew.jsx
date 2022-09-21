import React, {useState} from 'react'
import { PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import AsyncSelect from "react-select/async";

const TermEnrollmentNew = () => {
  const [xStudent, setXStudent] = useState({ label: "", value: "" });
  const [xclass, setXclass] = useState({ label: "", value: "" });

  const navigate = useNavigate();

  const loadOptionsStudents = async (inputValue, callback) => {
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

  const loadOptionsClasses = async (inputValue, callback) => {
    // perform a request
    const requestResults = await axiosInstance.get("basic/classes/");

    const { data } = requestResults;
    const options = [];
    data.forEach((item) => {
      options.push({ label: item.name, value: item.id });
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
          title="Enroll Students"
          subTitle="New"
          extra={[
            <div style={{ width: "250px" }}>
              <AsyncSelect
                placeholder="Select Student"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsStudents}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStudent(opt);
                }}
              />
            </div>,
            <div style={{ width: "200px" }}>
              <AsyncSelect
                placeholder="Select Class"
                defaultOptions
                cacheOptions
                loadOptions={loadOptionsClasses}
                onChange={(opt, meta) => {
                  console.log(opt, meta);
                  return setXStudent(opt);
                }}
              />
            </div>,
          ]}
        ></PageHeader>
      </div>
    </div>
  )
}

export default TermEnrollmentNew
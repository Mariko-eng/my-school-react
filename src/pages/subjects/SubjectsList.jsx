import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { Table, Button, PageHeader, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("basic/subjects/").then((res) => {
      setSubjects(res.data);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      key: "name",
      fixed: "left",
      width: 150,
      render: (_, record) => <div>{record.name}</div>,
    },
    {
      title: "Short Form",
      key: "short_form",
      render: (_, record) => <div>{record.name_short_form}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <div style={{ color: "purple" }}>Edit Subject</div>
        </div>
      ),
    },
    {
      title: "Other",
      key: "other",
      render: (_, record) => (
        <div>
          <div style={{ color: "blue" }}>View Teachers</div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Subjects"
          subTitle="List"
        />
      </div>
      <br />
      <Table
        columns={columns}
        dataSource={subjects}
        scroll={{
          x: 500,
        }}
      />
    </div>
  );
};

export default SubjectsList;

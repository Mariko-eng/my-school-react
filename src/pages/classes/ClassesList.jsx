import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { Table, PageHeader, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";

const ClassesList = () => {
  const [classes, setClasses] = useState([]);

  const navigate = useNavigate();

  const navigateToStudents = (detail) => {
    navigate("/home/classes/students/", { state: detail });
  };

  const navigateToTeachers = (detail) => {
    navigate("/home/classes/teachers/", { state: detail });
  };

  const navigateToTermFees = (detail) => {
    navigate("/home/classes/fees/", { state: detail });
  };

  useEffect(() => {
    axiosInstance.get("basic/classes/").then((res) => {
      setClasses(res.data);
    });
  }, []);

  const columns = [
    {
      title: "Class",
      key: "class",
      fixed: "left",
      width: 100,
      render: (_, record) => <div>{record.name}</div>,
    },
    {
      title: "Total Students",
      key: "total_students",
      render: (_, record) => <div>{record.total_students}</div>,
    },
    {
      title: "Action1",
      key: "action1",
      render: (_, record) => (
        <div>
          <div
            onClick={() => navigateToStudents(record)}
            style={{ color: "green" }}
          >
            View Students
          </div>
        </div>
      ),
    },
    {
      title: "Action 2",
      key: "action2",
      render: (_, record) => (
        <div>
          <div
            onClick={() => navigateToTeachers(record)}
            style={{ color: "blue" }}
          >
            View Teachers
          </div>
        </div>
      ),
    },
    {
      title: "Action 3",
      key: "action3",
      render: (_, record) => (
        <div>
          <div
            onClick={() => navigateToTermFees(record)}
            style={{ fontSize: "12px", color: "purple" }}
          >
            View Current Term Fees
          </div>
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
          title="Classes"
          subTitle="List"
        />
      </div>
      <br/>
      <Table
        columns={columns}
        dataSource={classes}
        scroll={{
          x: 500,
        }}
      />
    </div>
  );
};

export default ClassesList
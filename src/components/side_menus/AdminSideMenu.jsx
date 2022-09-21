import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { UserOutlined} from "@ant-design/icons";
import { Menu,Avatar } from "antd";
import { Link } from "react-router-dom";

const AdminSideMenu = () => {
  const [height, setHeight] = useState(100);

  useEffect(() => {
    let height = window.innerHeight;
    setHeight(height);
    window.addEventListener("resize", () => {
      let height = window.innerHeight;
      setHeight(height);
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        height,
        width: "200px",
        margin: "0px",
        backgroundColor: "rgb(0, 21, 40)",
        overflow: "auto",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "linear-gradient(grey, rgb(0, 21, 40))",
          height: "130px",
          color: "white",
          textAlign: "left",
          paddingLeft: "20px",
          paddingTop:"10px",
          marginBottom:"40px",
        }}
      >
        <Avatar size={118} icon={<UserOutlined />} />
        <p style={{paddingLeft: "20px",paddingTop: "5px",}}>Sir/Madam</p>
      </div>
      <div>
        <Menu theme="dark" defaultSelectedKeys={["a"]} mode="inline">
          <Menu.SubMenu icon={<UserOutlined />} key={["1"]} title="My Account">
            <Menu.Item key={["1a"]}>My Profile</Menu.Item>
            <Menu.Item key={["1b"]}>Settings</Menu.Item>
            <Menu.Item key={["1c"]}>Logout</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={["a"]}>
            <Link to="">DASHBOARD</Link>
          </Menu.Item>
          <Menu.Item key={["2"]}>
            <Link to="students">Students</Link>
          </Menu.Item>
          <Menu.Item key={["3"]}>
            <Link to="teachers">Teachers</Link>
          </Menu.Item>
          <Menu.Item key={["4"]}>
            <Link to="classes">Classes</Link>
          </Menu.Item>
          <Menu.Item key={["5"]}>
            <Link to="subjects">Subjects</Link>
          </Menu.Item>
          {/* <Menu.Item key={["6a"]}>
            <Link to="daily_attendances">Daily Attendance</Link>
          </Menu.Item> */}
          <Menu.Item key={["6b"]}>
            <Link to="term_enrollment">Term Enrollment</Link>
          </Menu.Item>
          <Menu.Item key={["7a"]}>
            <Link to="term_schedules">Term Scheduling</Link>
          </Menu.Item>
          {/* <Menu.Item key={["7b"]}>
            <Link to="class_timetables">Class TimeTables</Link>
          </Menu.Item> */}
          <Menu.Item key={["8"]}>
            <Link to="students/fees">School Fees</Link>
          </Menu.Item>
          <Menu.Item key={["9"]}>
            <Link to="other_staff">Other staff</Link>
          </Menu.Item>
          <Menu.Item key={["10"]}>
            <Link to="staff/salaries">Staff Salaries</Link>
          </Menu.Item>
          <Menu.Item key={["11"]}>
            <Link to="staff/allowances">Staff Allowances</Link>
          </Menu.Item>
          <Menu.Item key={["12"]}>
            <Link to="staff/advances/">Staff Advances</Link>
          </Menu.Item>
          <Menu.SubMenu key={["13j"]} title="Procurement">
            <Menu.Item key={["13a"]}>
              <Link to="procurement/inventory">Inventory</Link>
            </Menu.Item>
            <Menu.Item key={["13b"]}>
              <Link to="procurement/non_inventory">Non-Inventory</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key={["14j"]} title="Store">
            <Menu.Item key={["14a"]}>
              <Link to="store/inventory">Inventory</Link>
            </Menu.Item>
            <Menu.Item key={["14b"]}>
              <Link to="store/non_inventory">Non-Inventory</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={["15"]}>
            <Link to="other_expenses">Other Expenses</Link>
          </Menu.Item>
          <Menu.SubMenu key={["16"]} title="Users & Access">
            <Menu.Item key={["16a"]}>
              <Link to="users">Users</Link>
            </Menu.Item>
            <Menu.Item key={["16b"]}>
              <Link to="permissions">Permissions</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
      <div
        style={{
          width: "200px",
          height: "50px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "blue",
        }}
      >
        <ArrowLeftOutlined style={{ color: "white" }} />
      </div>
      {/* <div
        style={{
          position: "fixed",
          bottom: "0px",
          left: "50px",
          color: "white",
          paddingBottom: "10px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "blue",
          }}
        >
          <ArrowLeftOutlined />
        </div>
      </div> */}
    </div>
  );
};

export default AdminSideMenu;

import React from "react";
import {
  UsergroupAddOutlined,ApartmentOutlined,
  HomeOutlined,MoneyCollectOutlined,
  BankOutlined,BookOutlined,
  AppleOutlined,CalendarOutlined,
  ArrowLeftOutlined,LockOutlined,
  ExperimentFilled,EditOutlined
} from "@ant-design/icons";

import { UserOutlined } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { Link } from "react-router-dom";

const AppSideBar = () => {

  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        height: "100vh",
        margin: "0px",
        backgroundColor: "rgb(0, 21, 40)",
        overflow: "auto",
      }}
    >
      <Menu theme="dark" defaultSelectedKeys={["a"]} mode="inline">
        <Menu.Item icon={<HomeOutlined />} key={["aa"]}>
          <Typography.Text
            style={{
              color: "white",
            }}
          >
            DASHBOARD
          </Typography.Text>
        </Menu.Item>
        <Menu.SubMenu icon={<UserOutlined />} key={["1"]} title="My Account">
          <Menu.Item key={["1a"]}>My Profile</Menu.Item>
          <Menu.Item key={["1b"]}>Settings</Menu.Item>
          <Menu.Item key={["1c"]}>Logout</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<ApartmentOutlined />} key={["2"]} title="Basic">
          <Menu.Item icon={<ExperimentFilled />} key={["2a"]}>
            <Link to="admin/school-classes/">Classes</Link>
          </Menu.Item>
          <Menu.Item icon={<EditOutlined />} key={["2b"]}>
            <Link to="admin/subjects/">Subjects</Link>
          </Menu.Item>
          <Menu.Item icon={<CalendarOutlined />} key={["2c"]}>
            <Link to="admin/terms/">Time Table</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          icon={<UsergroupAddOutlined />}
          key={["3"]}
          title="Students"
        >
          <Menu.Item key={["3a"]}>
            <Link to="/home/students-term-enroll/new/">Term Enrollment</Link>
          </Menu.Item>
          <Menu.Item key={["3b"]}>
            <Link to="/home/students-term-enroll/">Enrolled Students</Link>
          </Menu.Item>
          <Menu.Item key={["3c"]}>
            <Link to="students/">List All Students</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<ApartmentOutlined />} key={["4"]} title="Staff">
          <Menu.Item key={["4a"]}>
            <Link to="staff/teachers/">Teaching Staff</Link>
          </Menu.Item>
          <Menu.Item key={["4b"]}>
            <Link to="staff/non-teaching-staff/">Non-Teaching Staff</Link>
          </Menu.Item>
          <Menu.Item key={["4c"]}>
            <Link to="staff/"> All Staff</Link>
          </Menu.Item>
          <Menu.Item key={["4d"]}>
            <Link to="admin/staff-roles/">Staff Roles</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          icon={<MoneyCollectOutlined />}
          key={["5"]}
          title="Students Finances"
        >
          <Menu.SubMenu key={["5a"]} title="Students Fees">
            <Menu.Item key={["5b"]}>
              <Link to="/home/finance/fees-term-payment">+ Make Payment</Link>
            </Menu.Item>
            <Menu.Item key={["5c"]}>
              <Link to="/home/finance/fees-term-payment-list">
                * Payment Recepts
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key={["6"]} title="Fees Structure">
            <Menu.Item key={["6a"]}>
              <Link to="admin/school-fees/">General Fees</Link>
            </Menu.Item>
            <Menu.Item key={["6b"]}>
              <Link to="admin/school-fees/new/">+ Add General Fee</Link>
            </Menu.Item>
            <Menu.Item key={["6c"]}>
              <Link to="admin/class-fees/">Class Fees</Link>
            </Menu.Item>
            <Menu.Item key={["6d"]}>
              <Link to="admin/class-fees/new/">+ Add Class Fee</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.SubMenu
          icon={<MoneyCollectOutlined />}
          key={["7"]}
          title="Staff Finances"
        >
          <Menu.SubMenu key={["7a"]} title="Salary Payments">
            <Menu.Item key={["7a1"]}>
              <Link to="finance/staff-salary-payment/receipt">
                + Make Payment{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key={["7a2"]}>
              <Link to="finance/staff-salary-payment/receipt">
                * Payment Receipts
              </Link>
            </Menu.Item>
            <Menu.Item key={["7a3"]}>
              <Link to="finance/staff-salary-overall">* Monthly Progress</Link>
            </Menu.Item>
            <Menu.SubMenu key={["7a4"]} title="Recorded Payments">
              <Menu.Item key={["7a4a"]}>
                <Link to="finance/staff-salary-payment/receipt">
                  * Pending (Monthly)
                </Link>
              </Menu.Item>
              <Menu.Item key={["7a4b"]}>
                <Link to="finance/staff-salary-payment/receipt">
                  * Approved (Monthly)
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
          <Menu.SubMenu key={["7d"]} title="Salary Structure">
            <Menu.Item key={["7e"]}>
              <Link to="finance/staff-salary-basic">* Basic Salaries</Link>
            </Menu.Item>
            <Menu.Item key={["7f"]}>
              <Link to="finance/staff-salary-basic/new">
                + Add Basic Salary
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key={["7g"]} title="Salary Advances">
            <Menu.Item key={["7h"]}>
              <Link to="finance/staff-advances">* All Staff Advances</Link>
            </Menu.Item>
            <Menu.Item key={["7i"]}>
              <Link to="finance/staff-advances/new">+ Add Staff Advance</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key={["7j"]} title="Staff Allowances">
            <Menu.Item key={["7k"]}>
              <Link to="finance/staff-allowances">* Allowance Receipts</Link>
            </Menu.Item>
            <Menu.Item key={["7l"]}>
              <Link to="finance/staff-allowances/new">+ Assign Allowance</Link>
            </Menu.Item>
            <Menu.Item key={["7m"]}>
              <Link to="finance/allowances">* All Allowances</Link>
            </Menu.Item>
            <Menu.Item key={["7n"]}>
              <Link to="finance/allowances/new">+ Register Allowance</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.SubMenu
          icon={<MoneyCollectOutlined />}
          key={["8"]}
          title="Mgt Finances "
        >
          <Menu.Item key={["81"]}>
            <Link to="finance/expenditure/">Expenditures</Link>
          </Menu.Item>
          <Menu.Item key={["82"]}>
            <Link to="finance/expenditure/">Incomes</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={["9"]} icon={<BankOutlined />} title="Store">
          <Menu.Item key={["9a"]}>
            <Link to="/home/inventory/in/records/">Stock In</Link>
          </Menu.Item>
          <Menu.Item key={["9b"]}>
            <Link to="/home/inventory/out/records/">Stock Out</Link>
          </Menu.Item>
          <Menu.Item key={["9c"]}>
            <Link to="/home/inventory">Current Stock</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          icon={<AppleOutlined />}
          key={["10"]}
          title="Requisitions"
        >
          <Menu.Item key={["10a"]}>Store</Menu.Item>
          <Menu.Item key={["10b"]}>Finance</Menu.Item>
          <Menu.Item key={["10c"]}>Others</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key={["auth"]}
          icon={<LockOutlined />}
          title="Users & Access"
        >
          <Menu.Item key={["u1"]}>
            <Link to="/home/system/users/">All</Link>
          </Menu.Item>
          <Menu.Item key={["u2"]}>
            <Link to="/home/system/users/">Students</Link>
          </Menu.Item>
          <Menu.Item key={["u3"]}>
            <Link to="/home/system/users/">Teachers</Link>
          </Menu.Item>
          <Menu.Item key={["u4"]}>
            <Link to="/home/system/users/">Staff-Admin</Link>
          </Menu.Item>
          <Menu.Item key={["u5"]}>
            <Link to="/home/system/users/">Staff-Casual</Link>
          </Menu.Item>
          <Menu.SubMenu
            key={["auth2"]}
            icon={<ApartmentOutlined />}
            title="Roles"
          >
            <Menu.Item key={["r1"]}>
              <Link to="/home/system/roles">All</Link>
            </Menu.Item>
            <Menu.Item key={["r2"]}>
              <Link to="/home/system/roles/add">Add</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key={["auth3"]}
            icon={<ApartmentOutlined />}
            title="Permissions"
          >
            <Menu.Item key={["p1"]}>
              <Link to="/home/system/permissions">All</Link>
            </Menu.Item>
            <Menu.Item key={["p2"]}>
              <Link to="/home/system/permissions/add">Add</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.SubMenu
          key={["logs"]}
          icon={<BookOutlined />}
          title="Activity Logs"
        >
          <Menu.Item key={["logs1"]}>
            <Link to="/home/activity-logs/">List</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          left: "25px",
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
      </div>
    </div>
  );
};

export default AppSideBar;

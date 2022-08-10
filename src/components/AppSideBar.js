import React from 'react'
import { 
  DesktopOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  TeamOutlined,
  BookOutlined, 
  AppleOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  LockOutlined,
 } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Menu,Typography } from 'antd';
import {Link} from 'react-router-dom';

const AppSideBar = () => {
// const [collapsed, setCollapsed] = useState(false);
// const { Sider } = Layout;

  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        height: "100vh",
        margin: "0px",
        backgroundColor: "rgb(0, 21, 40)",
        overflow: "auto"
      }}
    >
      <Menu theme="dark" defaultSelectedKeys={['a']} mode="inline">
      <Menu.Item icon={<HomeOutlined />} key={['aa']} >
      <Typography.Text
        style={{
          color:"white",
        }}>
        DASHBOARD
      </Typography.Text>
      </Menu.Item>
      <Menu.SubMenu icon={<UserOutlined/> } key={['1a']}  title="My Account">
          <Menu.Item key={['1a1']} >My Profile</Menu.Item>
          <Menu.Item key={['1a2']} >Settings</Menu.Item>
          <Menu.Item key={['1a3']} >Logout</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<DesktopOutlined/> } key={['b']}  title="Basic">
        <Menu.Item key={['b1']} >
          <Link to="admin/school-classes/">Classes</Link>
        </Menu.Item>
        <Menu.Item key={['b2']} >
          <Link to="admin/subjects/">Subjects</Link>
        </Menu.Item>
        <Menu.SubMenu icon={<CalendarOutlined/> } key={['b34']}  title="Time Table">
          <Menu.Item key={['b35']} >
            <Link to="admin/terms/">List</Link>
          </Menu.Item>
          <Menu.Item key={['b36']} >
            <Link to="admin/terms/new/">Register</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<UsergroupAddOutlined/> } key={['1b']}  title="Students">
          <Menu.Item key={['1b2']} >
          <Link to="students/">List Students</Link></Menu.Item>
          <Menu.Item key={['1b1']} >
            <Link to="students/register/">Registration</Link>
            </Menu.Item>
          <Menu.Item key={['1b4']} >Student Classes</Menu.Item>
       </Menu.SubMenu>
       <Menu.SubMenu icon={<TeamOutlined/> } key={['1c']} title="Teachers">
          <Menu.Item key={['1c2']} >
          <Link to="staff/teachers/">List Teachers</Link></Menu.Item>
          <Menu.Item key={['1c1']} >
          <Link to="staff/teachers/register/">Registration</Link></Menu.Item>
          <Menu.Item key={['1c4']} >Teacher Classes</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<ApartmentOutlined/> } key={['1d']} title="Staff">
          <Menu.Item key={['1d1']}>
          <Link to="staff/">All Staff</Link>
          </Menu.Item>
          <Menu.Item key={['1d2']}>
          <Link to="staff/non-teaching-staff/">Non-Teaching Staff</Link>
          </Menu.Item>
          <Menu.Item key={['1d3']}>
          <Link to="staff/non-teaching-staff/register/">Registration</Link>
          </Menu.Item>
          <Menu.Item key={['b3']}>
          <Link to="admin/staff-roles/">Staff Roles</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<MoneyCollectOutlined/>} key={['3']} title="Finance">
        <Menu.SubMenu key={['3a']} title="Students">
            <Menu.Item key={['3a2']} >
              <Link to="/home/finance/fees-term-payment-list">Fees Payment List</Link>
            </Menu.Item>
            <Menu.Item key={['3a1']} >
              <Link to="/home/finance/fees-term-payment">+ Add Fees Payment</Link>
            </Menu.Item>
            <Menu.Item key={['b321']} >
              <Link to="admin/class-fees/">Class Fees List</Link>
            </Menu.Item>
          <Menu.Item key={['b331']} >
              <Link to="admin/class-fees/new/">+ Add Class Fees</Link>
          </Menu.Item>
          <Menu.Item key={['b32']} >
            <Link to="admin/school-fees/">General Fees List</Link>
          </Menu.Item>
          <Menu.Item key={['b33']} >
            <Link to="admin/school-fees/new/">+ Add General Fee</Link>
          </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key={['3b']} title="Staff">
            <Menu.Item key={['3b1']} >
            <Link to="finance/staff-salary-payment">* Salaries List</Link></Menu.Item>
            <Menu.Item key={['3b2']} >
            <Link to="finance/staff-salary/new/">+ Add Salary</Link></Menu.Item>
            <Menu.Item key={['3b3']} >
            <Link to="finance/staff-salary-payment">* Salary Payments</Link></Menu.Item>
            <Menu.Item key={['3b4']} >
            <Link to="finance/staff-salary-payment/new/">+ Pay Salary</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key={['3c']} title="Allowances & Advances">
            <Menu.Item key={['3c1']} >
            <Link to="finance/staff-allowances">* All Staff Allowances</Link></Menu.Item>
            <Menu.Item key={['3c2']} >
            <Link to="finance/staff-allowances/new">+ Add Staff Allowance</Link></Menu.Item>
            <Menu.Item key={['3c3']} >
            <Link to="finance/allowances">* All Allowances</Link></Menu.Item>
            <Menu.Item key={['3c4']} >
            <Link to="finance/allowances/new">+ Add Allowance</Link></Menu.Item>
            <Menu.Item key={['3c5']} >
            <Link to="finance/staff-advances">* All Staff Advances</Link></Menu.Item>
            <Menu.Item key={['3c6']} >
            <Link to="finance/staff-advances/new">+ Add Staff Advance</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={['3d1']}>Custom Receipts</Menu.Item>
          <Menu.Item key={['3d2']}>Custom Acknowledgment</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={['4']}  icon={<BankOutlined/>} title="Store">
          <Menu.Item key={['4a']}>
            <Link to="/home/inventory">Current Stock</Link>
          </Menu.Item>
          <Menu.Item key={['4b']}>
            <Link to="/home/inventory/new">Stock In</Link>
          </Menu.Item>
          <Menu.Item key={['4c']}>
            <Link to="/home/inventory/out/">Stock Out</Link>
          </Menu.Item>
          <Menu.Item key={['4d']}>
            <Link to="/home/inventory/products/">Products</Link>
          </Menu.Item>
          <Menu.Item key={['4e']}>
            <Link to="/home/inventory/records/">Records</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu icon={<AppleOutlined/>} key={['2']} title="Requisitions">
          <Menu.Item key={['2a']} >Store</Menu.Item>
          <Menu.Item key={['2b']} >Finance</Menu.Item>
          <Menu.Item key={['2c']} >Others</Menu.Item>
        </Menu.SubMenu>
      <Menu.SubMenu key={['auth']}  icon={<LockOutlined/>} title="Users & Access">
          <Menu.Item key={['u1']}>
            <Link to="/home/system/users/">
              All
            </Link>
          </Menu.Item>
          <Menu.Item key={['u2']}>
            <Link to="/home/system/users/">
              Students
            </Link>
          </Menu.Item>
          <Menu.Item key={['u3']}>
            <Link to="/home/system/users/">
              Teachers
            </Link>
          </Menu.Item>
          <Menu.Item key={['u4']}>
            <Link to="/home/system/users/">
              Staff-Admin
            </Link>
          </Menu.Item>
          <Menu.Item key={['u5']}>
            <Link to="/home/system/users/">
              Staff-Casual
            </Link>
          </Menu.Item>
          <Menu.SubMenu key={['auth2']}  icon={<ApartmentOutlined/>} title="Roles">
          <Menu.Item key={['r1']}>
            <Link to="/home/system/roles">
              All
            </Link>
          </Menu.Item>
          <Menu.Item key={['r2']}>
            <Link to="/home/system/roles/add">
              Add
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={['auth3']}  icon={<ApartmentOutlined/>} title="Permissions">
          <Menu.Item key={['p1']}>
            <Link to="/home/system/permissions">
              All
            </Link>
          </Menu.Item>
          <Menu.Item key={['p2']}>
            <Link to="/home/system/permissions/add">
              Add
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu key={['7']} icon={<BookOutlined/>} title="Activity Logs">
        <Menu.Item key={['7a']}>
        <Link to="/home/activity-logs/">
        List
        </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
    <div style={{ 
        position: "fixed",
        bottom:"0px",
        left:"25px",
        color:"white",
        paddingBottom:"10px",
        zIndex:2
        }}>
          <div 
          style={{
            width : "40px",
            height : "40px",
            borderRadius: "20px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background:"blue"}}
          >
          <ArrowLeftOutlined />
          </div>
    </div>
    </div>

  //   <Sider 
  //     // collapsible 
  //     // collapsed={collapsed} 
  //     // onCollapse={(value) => setCollapsed(value)}
  //     style={{
  //       position: "fixed",
  //       overflow: "scroll",
  //       width:"300px"
  //     }}
  //     >
  //   <Menu theme="dark" defaultSelectedKeys={['a']} mode="inline">
  //     <Menu.Item icon={<HomeOutlined />} key={['aa']} >
  //     <Typography.Text
  //       style={{
  //         color:"white",
  //       }}>
  //       DASHBOARD
  //     </Typography.Text>
  //     </Menu.Item>
  //     <Menu.SubMenu icon={<UserOutlined/> } key={['1a']}  title="My Account">
  //         <Menu.Item key={['1a1']} >My Profile</Menu.Item>
  //         <Menu.Item key={['1a2']} >Settings</Menu.Item>
  //         <Menu.Item key={['1a3']} >Logout</Menu.Item>
  //     </Menu.SubMenu>
  //     <Menu.SubMenu icon={<DesktopOutlined/> } key={['b']}  title="Basic">
  //       <Menu.Item key={['b1']} >
  //         <Link to="admin/school-classes/">Classes</Link>
  //       </Menu.Item>
  //       <Menu.Item key={['b2']} >
  //         <Link to="admin/subjects/">Subjects</Link>
  //       </Menu.Item>
  //       <Menu.SubMenu icon={<MoneyCollectOutlined/> } key={['b31']}  title="School Fees">
  //         <Menu.Item key={['b32']} >
  //           <Link to="admin/school-fees/">List</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['b33']} >
  //           <Link to="admin/school-fees/new/">Add</Link>
  //         </Menu.Item>
  //       </Menu.SubMenu>
  //       <Menu.SubMenu icon={<CalendarOutlined/> } key={['b34']}  title="Time Table">
  //         <Menu.Item key={['b35']} >
  //           <Link to="admin/terms/">List</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['b36']} >
  //           <Link to="admin/terms/new/">Register</Link>
  //         </Menu.Item>
  //       </Menu.SubMenu>
  //     </Menu.SubMenu>
  //     <Menu.SubMenu icon={<UsergroupAddOutlined/> } key={['1b']}  title="Students">
  //         <Menu.Item key={['1b2']} >
  //         <Link to="students/">List Students</Link></Menu.Item>
  //         <Menu.Item key={['1b1']} >
  //           <Link to="students/register/">Registration</Link>
  //           </Menu.Item>
  //         <Menu.Item key={['1b3']} >Search Student</Menu.Item>
  //         <Menu.Item key={['1b4']} >Student Classes</Menu.Item>
  //     </Menu.SubMenu>
  //       <Menu.SubMenu icon={<TeamOutlined/> } key={['1c']} title="Teachers">
  //         <Menu.Item key={['1c2']} >
  //         <Link to="staff/teachers/">List Teachers</Link></Menu.Item>
  //         <Menu.Item key={['1c1']} >
  //         <Link to="staff/teachers/register/">Registration</Link></Menu.Item>
  //         <Menu.Item key={['1c3']} >Search Teacher</Menu.Item>
  //         <Menu.Item key={['1c4']} >Teacher Classes</Menu.Item>
  //       </Menu.SubMenu>
  //       <Menu.SubMenu icon={<ApartmentOutlined/> } key={['1d']} title="Other Staff">
  //         <Menu.Item key={['1d1']} >
  //         <Link to="staff/non-teaching-staff/">Staff Admin</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['1d2']} >
  //         <Link to="staff/non-teaching-staff/">Staff Casual</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['1d3']} >
  //         <Link to="staff/non-teaching-staff/register/">Registration</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['b3']} >
  //         <Link to="admin/staff-roles/">Staff Roles</Link></Menu.Item>
  //       </Menu.SubMenu>
  //       <Menu.SubMenu icon={<AppleOutlined/>} key={['2']} title="Requisitions">
  //         <Menu.Item key={['2a']} >Store</Menu.Item>
  //         <Menu.Item key={['2b']} >Finance</Menu.Item>
  //         <Menu.Item key={['2c']} >Others</Menu.Item>
  //       </Menu.SubMenu>
  //       <Menu.SubMenu icon={<MoneyCollectOutlined/>} key={['3']} title="Finance">
  //         <Menu.SubMenu icon={<DesktopOutlined/>} key={['3a']} title="Students">
  //         <Menu.Item key={['3a1']} >
  //         <Link to="/home/finance/fees-term-payment">Make Payment</Link>
  //         </Menu.Item>
  //           <Menu.Item key={['3a11']} >Issue Receipt</Menu.Item>
  //           <Menu.Item key={['3ab']} >Acknowledgment</Menu.Item>
  //         </Menu.SubMenu>
  //         <Menu.SubMenu icon={<DesktopOutlined/>} key={['3b']} title="Staff">
  //           <Menu.Item key={['3b1']} >Issue Receipt</Menu.Item>
  //           <Menu.Item key={['3b2']} >Acknowledgment</Menu.Item>
  //         </Menu.SubMenu>
  //         <Menu.SubMenu icon={<DesktopOutlined/>} key={['3c']} title="Others">
  //           <Menu.Item key={['3c1']} >Issue Receipt</Menu.Item>
  //           <Menu.Item key={['3cb']} >Acknowledgment</Menu.Item>
  //         </Menu.SubMenu>
  //       </Menu.SubMenu>
  //       <Menu.SubMenu key={['4']}  icon={<BankOutlined/>} title="Store">
  //         <Menu.Item key={['4a']}>
  //           <Link to="/home/inventory">Current Stock</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['4b']}>
  //           <Link to="/home/inventory/new">Stock In</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['4c']}>
  //           <Link to="/home/inventory/out/">Stock Out</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['4d']}>
  //           <Link to="/home/inventory/products/">Products</Link>
  //         </Menu.Item>
  //         <Menu.Item key={['4e']}>
  //           <Link to="/home/inventory/records/">Records</Link>
  //         </Menu.Item>
  //       </Menu.SubMenu>
  //     <Menu.SubMenu key={['auth']}  icon={<DesktopOutlined/>} title="Authentication">
  //       <Menu.SubMenu key={['u']} icon={<DesktopOutlined/>} title="Users">
  //         <Menu.Item key={['u1']}>
  //           <Link to="/home/auth/users/">
  //             List
  //           </Link>
  //         </Menu.Item>
  //         <Menu.Item key={['u2']}>
  //           <Link to="/home/auth/users/new/">
  //             Add
  //           </Link>
  //         </Menu.Item>
  //     </Menu.SubMenu>
  //       <Menu.SubMenu key={['ab']} icon={<DesktopOutlined/>} title="Groups">
  //       <Menu.Item key={['ab1']}>
  //       <Link to="/home/auth/groups/">
  //       List
  //       </Link>
  //       </Menu.Item>
  //       <Menu.Item key={['ab2']}>
  //       <Link to="/home/auth/groups/">
  //       Add
  //       </Link>
  //       </Menu.Item>
  //     </Menu.SubMenu>
  //     </Menu.SubMenu>
  //     <Menu.SubMenu key={['7']} icon={<BookOutlined/>} title="Activity Logs">
  //       <Menu.Item key={['7a']}>
  //       <Link to="/home/activity-logs/">
  //       List
  //       </Link>
  //       </Menu.Item>
  //     </Menu.SubMenu>
  //   </Menu>
  // </Sider>
  )
}

export default AppSideBar
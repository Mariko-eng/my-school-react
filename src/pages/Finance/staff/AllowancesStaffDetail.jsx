import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppBreadcrumb } from '../../../components'
import axios from "axios";
import { Table, Modal, Button, Card } from "antd";

const AllowancesStaffDetail = () => {
    const location = useLocation()
    const {state} = location
    const [allowanceData, setAllowanceData] = useState([]);
    const [xAllowance, setxAllowance] = useState([]);
    const [visible, setVisible] = useState(false);

    const getAllowancesForSingleStaff = (staffId) => {
      axios
      .get(`http://localhost:8000/finance/staff-monthly-allowances-crud/${staffId}/`)
      .then((res) => {
        setAllowanceData(res.data);
      });
    }

    useEffect(() => {
      getAllowancesForSingleStaff(state.record.id)
    }, [state]);

    const editProduct = (record) => {
      setVisible(true);
      setxAllowance(record);
    };

    const handleCancel = () => {
      setVisible(false);
    };

    const handleRemove = (record) => {
      setVisible(false);
      const allowance_data = {
        staff_id : state.staff.id,
        x_allowance : {
          id: record.id,
          name:record.name
        }
      }
      const url = "http://localhost:8000/finance/staff-monthly-allowances-remove/";
      axios
        .post(url, allowance_data, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          Modal.success({ title: "Successfully Removed Staff Allowance!" });
          return getAllowancesForSingleStaff(state.record.id)
        })
        .catch((error) => {
          console.log(error);
          return Modal.error({
            title: "Failed To Remove Staff Allowance Or Service Not Currently Available",
          });
        });
    };

    const columns = [
      {
        title: "Name",
        key: "name",
        render: (_, record) => <div>{record.name}</div>,
      },
      {
        title: "Amount",
        key: "amount",
        render: (_, record) => <div>{record.amount} SHS</div>,
      },
      {
        title: "Status",
        dataIndex: "is_approved",
        key: "status",
        render: (_, record) => (
          <div> {record.is_approved ? <div>True</div> : <div>False</div>}</div>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => 
            <div key={record} onClick={() => editProduct(record)} style={{ color: "blue" }}>
              Edit
            </div>
      },
    ];

    return (
      <>
        <div>
          <AppBreadcrumb title="Staff Allowances" action1="All" />
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <Card>
              <p>Staff Names</p>
              <p> - {state.staff.first_name} {state.staff.last_name}</p>
              <p>Staff ID</p>
              <p> - {state.staff.staff_id}</p>
            </Card>
            <Table columns={columns} dataSource={allowanceData.monthly_allowances} />
          </div>
        </div>
        {visible && (
          <Modal
            key={xAllowance.key}
            title={xAllowance.name}
            visible={visible}
            onCancel={() => setVisible(false)}
            onOk={() => setVisible(false)}
            okText="OK"
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button key="edit" type="primary" onClick={handleCancel}>
                Edit
              </Button>,
              <Button key="del" style={{ color: "red" }} onClick={() => handleRemove(xAllowance)}>
                Remove Allowance
              </Button>,
            ]}
          >
            <p>Amount</p>
            <p>{xAllowance.amount} SHS</p>
          </Modal>
        )}
      </>
    );
}

export default AllowancesStaffDetail
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
} from "antd";
import axiosInstance from '../../utils/axios'

const StaffSalaryRegisteredDetail = () => {
  const location = useLocation();
  const { state } = location;
  const item = state;
  // console.log(data)
  const [data, setData] = useState(item);
  const [visible, setVisible] = useState(false);
  const [terms, setTerms] = useState([]);
  const [xterm, setXTerm] = useState({ id: "" });
  const [month, setMonth] = useState(0);


  const navigate = useNavigate()

  const navigateToSalaryPaymentList = () => {
    navigate("/home/finance/staff-salary-payment",);
  };

  const onChangeDateMonth = (date, dateString) => {
    setMonth(date._d.getMonth() + 1);
  };

  useEffect(() => {
    axiosInstance.get(`http://127.0.0.1:8000/finance/staff-salary-overall-crud/${item.id}/`).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  }, [item]);

  useEffect(() => {
    axiosInstance.get("http://127.0.0.1:8000/basic/terms/").then((res) => {
      setTerms(res.data);
    });
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setXTerm({ id: "" });
    setMonth(0);
  };

  const handleSubmit = () => {
    setVisible(false);
    if (xterm.id === "") {
      console.log(xterm)
      return Modal.error({ title: "Select Term / Study Period" });
    }
    if (month === 0) {
      return Modal.error({ title: "Select Month Of Payment" });
    }
    let allowances = [];
    let total_allowances = 0;
    if (data.staff_allowances_total === 0) {
      allowances = [];
    } else {
      allowances = data.staff_allowances.monthly_allowances;
      total_allowances = data.staff_allowances.get_total_allowances;
    }
    let advances = [];
    let total_advances = 0;
    if (data.get_total_running_advances === 0) {
      advances = [];
    } else {
      for (let i = 0; i < data.staff_advances.length; i++) {
        if (
          data.staff_advances[i].is_issued &&
          data.staff_advances[i].get_balance_per_repayment_months > 0
        ) {
          advances.push(data.staff_advances[i]);
        }
      }
      total_advances = data.get_total_running_advances;
    }
    const salary_payment_data = {
      staff_id: data.staff.id,
      term_id: xterm.id,
      month: month,
      basic_amount: Number(data.basic_amount),
      nssf_amount: data.get_nssf_amount,
      advances: advances,
      total_advances: total_advances,
      allowances: allowances,
      total_allowances: total_allowances,
      net_salary:
        Number(data.basic_amount) +
        data.staff_allowances_total -
        (data.get_nssf_amount + data.get_total_running_advances),
    };
    console.log(salary_payment_data);

    const url = "http://localhost:8000/finance/staff-salary-payment-add/"
    axiosInstance.post(url , salary_payment_data, {
      headers: {
        "content-type" : "application/json"
      }
    }).then(response => {
      Modal.success({title : response.statusText})
      return navigateToSalaryPaymentList()
    }
      )
    .catch(error =>
      {
        console.log(error)
        return Modal.error({title : "Salary Payment Record Already Exists Or Service Not Currently Available"})
      })
  };

  return (
    <>
      <div>
        <div>
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Salary Detail</Breadcrumb.Item>
            <Breadcrumb.Item>Staff ID : {data.staff.staff_id}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{ display: "flex" }}>
          <p>Staff:</p>
          <p style={{ marginLeft: "20px", marginRight: "20px" }}>
            {data.staff.first_name.toUpperCase()}{" "}
            {data.staff.last_name.toUpperCase()}
          </p>
          <p>{data.staff.phone_number.toUpperCase()}</p>
        </div>
        <Row>
          <Col span={24}>
            <Card title="Basic">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Basic amount</div>
                  <div>{Number(data.basic_amount).toLocaleString()} SHS</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>NSSF</div>
                  <div>
                    <span>({Number(data.nssf_percentage)}%)</span>
                    <span>{Number(data.get_nssf_amount)} SHS</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Allowances">
              <div style={{ display: "flex", flexDirection: "column" }}>
                {data.staff_allowances_total === 0 ? (
                  <div>0.0 SHS</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {data.staff_allowances.monthly_allowances.map(
                      (item, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Name</div>
                            <div>
                              {item.name}{" "}
                              {item.is_approved ? (
                                <span style={{ color: "green", fontSize: 12 }}>
                                  (Approved)
                                </span>
                              ) : (
                                <span style={{ color: "red", fontSize: 12 }}>
                                  (Not-Approved)
                                </span>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Amount</div>
                            <div>{Number(item.amount).toLocaleString()}</div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </Card>
            <Card title="Advances">
              <div style={{ display: "flex", flexDirection: "column" }}>
                {
                  data.get_total_running_advances ===
                0 ? (
                  <div>0.0 SHS</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {data.staff_advances.map(
                      (item, index) =>
                        item.status === "Running" && (
                          <div
                            key={index}
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>Reason</div>
                              <div>{item.reason}</div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>Status</div>
                              <div
                                style={
                                  item.status === "Running"
                                    ? { color: "green" }
                                    : { color: "blue" }
                                }
                              >
                                {item.status}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>Is-Issued</div>
                              <div
                                style={
                                  item.is_issued
                                    ? { color: "green" }
                                    : { color: "blue" }
                                }
                              >
                                {item.is_issued ? "Yes" : "No"}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>Repayment Period</div>
                              <div style={{ color: "blue" }}>
                                {item.repayment_period} *(Months)
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>Requested Amount</div>
                              <div>
                                {Number(item.requested_amount).toLocaleString()}{" "}
                                SHS
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>Issued Amount</div>
                              <div>
                                {Number(item.issued_amount).toLocaleString()}{" "}
                                SHS
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ color: "red" }}>
                                Balance Of Current Month
                              </div>
                              <div style={{ color: "red" }}>
                                {Number(
                                  item.get_balance_per_repayment_months
                                ).toLocaleString()}{" "}
                                SHS
                              </div>
                            </div>
                          </div>
                        )
                    )}
                    {data.get_total_running_advances === 0 && <div>0 SHS</div>}
                  </div>
                )}
              </div>
            </Card>
            <Card title="Total Payment">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Basic amount + Allowances</div>
                  <div>
                    {(
                      Number(data.basic_amount) + data.staff_allowances_total
                    ).toLocaleString()}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Nssf + Advances</div>
                  <div>
                    -(
                    {(
                      data.get_nssf_amount + data.get_total_running_advances
                    ).toLocaleString()}
                    )
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Total</div>
                  <div style={{ color: "blue", fontWeight: "bold" }}>
                    {(
                      Number(data.basic_amount) +
                      data.staff_allowances_total -
                      (data.get_nssf_amount + data.get_total_running_advances)
                    ).toLocaleString()}{" "}
                    SHS
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row style={{ margin: "20px", justifyContent: "end" }}>
          <Col>
            <Button onClick={showModal} type="primary">
              Register Salary Month
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        visible={visible}
        title="Register Salary Payment"
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <div>
          <Form>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              name="period"
              label="Term Of Year"
            >
              <Select
                placeholder="select One"
                onSelect={(val) => {
                  let obj = terms.find((item) => item.id === val);
                  setXTerm(obj);
                }}
              >
                {terms.map((item, index) => (
                  <Select.Option key={index} value={item.id}>
                    {item.name} - {item.academic_year}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              name="month"
              label="Month"
              rules={[{ required: false }]}
            >
              <DatePicker picker="month" onChange={onChangeDateMonth} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default StaffSalaryRegisteredDetail
import React from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Breadcrumb, Row, Col, Card } from "antd";

const StudentFeesPaymentReceipt = () => {
  const location = useLocation();
  const { state } = location;
  const data = state;

  return (
    <div>
      <div>
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>School Fees Payment</Breadcrumb.Item>
          <Breadcrumb.Item>Receipt Number : {data.receipt_id}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ minHeight: "400px", width: "400px" }}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ color: "orange", fontSize: "12px" }}>
                    {data.receipt_id}
                  </div>
                  <div style={{ fontSize: "12px" }}>St. Matia Mulumba</div>
                  <div style={{ fontSize: "12px" }}>Primary School</div>
                  <div style={{ fontSize: "14px" }}>Date Of Payment</div>
                  <div style={{ fontSize: "12px" }}>
                    {moment(data.created).format("MMMM Do YYYY")}
                  </div>
                  <div style={{ fontSize: "12px" }}>
                    {moment(data.created).format("h:mm:ss a")}
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div>RECEIPT</div>
                  <div>(Proof Of Payment)</div>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Student First Name</div>
                  <div
                    style={{
                      color: "blue",
                    }}
                  >
                    {data.student.first_name.toUpperCase()}{" "}
                    {data.student.given_name}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Student Last Name</div>
                  <div
                    style={{
                      color: "blue",
                    }}
                  >
                    {data.student.last_name}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Class</div>
                  <div
                    style={{
                      color: "blue",
                    }}
                  >
                    {data.class_name}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Period Of Study</div>
                  <div
                    style={{
                      color: "blue",
                    }}
                  >
                    {data.term.name}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Paid By</div>
                  <div
                    style={{
                      color: "blue",
                    }}
                  >
                    {data.paid_by_name.toUpperCase()}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Contact</div>
                  <div
                    style={{
                      color: "blue",
                    }}
                  >
                    {data.paid_by_phone.toUpperCase()}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "50px",
                    marginBottom: "30px",
                    display: "flex",
                    alignItems: "end",
                    flexDirection: "column",
                  }}
                >
                  <div>Amount Paid</div>
                  <div
                    style={{
                      color: "blue",
                    }}
                  >
                    {data.amount_paid} SHS ONLY
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                  }}
                >
                  <div
                    style={{
                      color: "orange",
                    }}
                  >
                    Thenks For The Payment
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default StudentFeesPaymentReceipt
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, Button, Breadcrumb,Row,Col,Card,Drawer } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";

const InventoryStockOut = () => {
  const [terms, setTerms] = useState([]);
  const [xTerm, setXTerm] = useState({ id: "" });
  const [searches, setSearches] = useState([]);
  const [xSearch, setXSearch] = useState({id:""});

  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const navigateToListItemsPage = () => {
    setVisible(false);
    return navigate("/home/inventory/");
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/basic/terms/").then((res) => {
      setTerms(res.data);
    });
  }, []);


  const handleCancel = () => {
    setVisible(false);
  };

  const handleSuccess = () => {
    setXSearch({id:""})
    setVisible(true);
  };

  const getItems = (val) => {
    axios.get(`http://127.0.0.1:8000/store/item-search-store/${val}/`).then((res) => {
      // console.log(res.data)
      setSearches(res.data);
    });
  }

  const onFinish = (values) => {
    if (xTerm.id === "") {
      return Modal.error({ title: "Choose Study Period" });
    }
    const data = {
      term_id: xTerm.id,
      item_id: xSearch.id,
      units: values.units,
      quantity: Number(values.quantity),
      consumer: values.consumer,
      comments: values.comments,
    };
    console.log(data);
    const url = "http://127.0.0.1:8000/store/outward-new/";
    axios
      .post(url, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => handleSuccess())
      .catch((error) => {
        console.log(error);
        return Modal.error({
          title: "Data Already Exists Or Service Not Currently Available",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    return Modal.error({ title: "Incomplete Data" });
  };

  return (
    <>
      <div>
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Issue Stock Out</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/inventory/out/records" style={{ color: "blue" }}>
              View Records
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
              <div onClick={showDrawer}>
                Search <SearchOutlined/>
              </div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div
        className="site-layout-content"
        style={{
          minHeight: "280px",
          padding: "24px",
          background: "#fff",
        }}
      >
        { xSearch.id !== "" ?
        <Form
          name="control-hooks"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item
            wrapperCol={{ offset: 4, span: 20 }}
            style={{
              background: "cornsilk",
            }}
          >
            Fill In The Form
          </Form.Item>
          <div>
              <p>ITEM : <span style={{color:"blue"}} >{xSearch.name}</span></p>
            </div>
          <Form.Item
            label="Period Of Study"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Select
              placeholder="select One"
              onChange={(val) => {
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
          <Form.Item name="units" label="Units" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Item Quantity"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="consumer" label="Consumer" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="comments" label="Comments" initialValue=""rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button onClick={() => setXSearch({id:""})}>
              Reset
            </Button>
          </Form.Item>
        </Form>
        :<div style={{ textAlign:"center",color:"blue" ,marginTop:"50px" }} onClick={showDrawer}>
          Search Item Here<SearchOutlined/>
        </div>
        }
      </div>
      {visible && (
        <Modal
          // title="Success"
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          okText="OK"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Add Another Item
            </Button>,
            <Button key="edit" type="primary" onClick={navigateToListItemsPage}>
              Go To List Items
            </Button>,
          ]}
        >
          <p style={{ color: "green" }}>
            {" "}
            Congs, Item was Added Successfully!
            <span>
              <CheckCircleOutlined />
            </span>
          </p>
        </Modal>
      )}
      <Drawer
        title="Student Search"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visibleDrawer}
        key={"right"}
      >
        <Row>
          <Col span={24}>
            <Card>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form.Item>
                  Search By Name
                  <Input
                    prefix={<SearchOutlined />}
                    onChange={(val) => {
                      if (val.target.value.trim().length >= 1) {
                        getItems(val.target.value.trim());
                      }
                    }}
                  />
                </Form.Item>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              style={{
                height: "200px",
                overflow: "auto",
              }}
            >
              {searches.map((result, index) => {
                return (
                  <div key={index} style={{ paddingLeft: "10px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div onClick = {() => {
                          setXSearch(result)
                          return onClose()
                        }} style={{ paddingLeft: "10px" }}>
                          ~ {result.name} <span style={{color:"blue"}} >Select</span>
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default InventoryStockOut
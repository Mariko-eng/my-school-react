import React, { useState } from "react";
import { Button, PageHeader, Form, Select, DatePicker,Radio, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const TermschedulesNew = () => {
  const [ acYr, setAcYr ] = useState();
  const [startDate, setStartDate ] = useState();
  const [ endDate, setEndDate ] = useState();
  const [ isRunning, setIsRunning ] = useState(false);

  const navigate = useNavigate();

  const onFinish = (values) => {
    const term_data = {
      start_date: startDate,
      end_date: endDate,
      name: values.term,
      academic_year: Number(acYr),
      status: isRunning ? "Running" : "Pending"
    };
    console.log(term_data);
    const url = 'basic/terms/'
    axiosInstance.post(url, term_data).then(response => {
      Modal.success({title:response.statusText})
      return navigate(-1)

    }).catch(error => {
      console.log(error)
      return Modal.error({ title: "Failed To Add Term Data" });
    })
  };

  const onFinishFailed = (errorInfo) => {
    return Modal.error({ title: "Icomplete Data" });
  };

  const onChangeDate = (date, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  const onChangeDate2 = (date, dateString) => {
    setAcYr(dateString);
  };

  return (
    <div>
      <div>
        <PageHeader
          ghost={false}
          onBack={() => navigate(-1)}
          title="Periods Of Study"
          subTitle="Add"
        ></PageHeader>
      </div>
      <br/>
      <div
      style={{ 
        minHeight: "280px",
        padding:"24px",
        background:"#fff"
      }}
      >
        <Form
          name="control-hooks"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            name="term"
            label="Select Term"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select One">
              <Select.Option value="First Term">First Term</Select.Option>
              <Select.Option value="Second Term">Second Term</Select.Option>
              <Select.Option value="Third Term">Third Term</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="start-end"
            label="Start - End"
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker onChange={onChangeDate} />
          </Form.Item>
          <Form.Item
            name="year"
            label="Academic Year"
            rules={[{ required: true }]}
          >
            <DatePicker picker="year" onChange={onChangeDate2} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Is Currently Active?"
            initialValue={isRunning}
            rules={[{ required: true }]}
            onChange={(val) => {
              setIsRunning((preVal) => !preVal);
            }}
          >
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add Term
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TermschedulesNew;

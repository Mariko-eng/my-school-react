import React, { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { Table, Tag, Space, Button, Input, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { FileAddFilled } from "@ant-design/icons";
import moment from "moment";

const InventoryStockInRecords = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [records, setRecords] = useState([]);

  const getProducts = () => {
    const url = "http://127.0.0.1:8000/store/inward-list/";
    axios.get(url).then((res) => {
      const { data } = res;
      setRecords(data);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      fixed: "left",
      width: 150,
      sorter: (a, b) => a.item.length - b.item.length,
      sortDirections: ["descend"],
      ...getColumnSearchProps("item"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Measure",
      dataIndex: "measure",
      key: "measure",
      ...getColumnSearchProps("measure"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Units",
      dataIndex: "units",
      key: "units",
      ...getColumnSearchProps("units"),
    },
    {
      title: "Term",
      dataIndex: "term",
      key: "term",
      render: (_, record) => (
        <div>
          {record.term.name} ({record.term.academic_year})
        </div>
      ),
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => (
        <div>
          {moment(record.date_created).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      ),
    },
    {
      title: "Status",
      key: "is_approved",
      dataIndex: "is_published",
      render: (status) => (
        <>
          {status ? (
            <Tag color={"blue"}>{"True"}</Tag>
          ) : (
            <Tag color={"red"}>{"False"}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="" style={{ color: "green", fontSize: "12px" }}>
            Stock In
          </Link>
          <Link to="" style={{ color: "orange", fontSize: "12px" }}>
            Stock Out
          </Link>
          <Link to="" style={{ color: "blue", fontSize: "12px" }}>
            Request
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Inventory</Breadcrumb.Item>
          <Breadcrumb.Item>Inward Stock Records</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/inventory/new" style={{ color: "green" }}>
              Add New Stock <FileAddFilled />
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>{" "}
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Table
          columns={columns}
          dataSource={records}
          scroll={{
            x: 1000,
          }}
        />
      </div>
    </div>
  );
};

export default InventoryStockInRecords;

import React, { useEffect,useState,useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'
import {Table, Tag, Space ,Button, Input,Breadcrumb} from 'antd'
import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words';

const InventoryStock = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
          color: filtered ? '#1890ff' : undefined,
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
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const [products, setProducts] = useState([])

  const getProducts = () => {
    const url = 'http://127.0.0.1:8000/products/';
    axios.get(url).then(res => {
      const { data } = res
      const objs = []
      data.forEach(item =>{
        if(item.products.length >= 1){
          objs.push(...item.products)
        }
        setProducts(objs)
      })
    })
  }
  useEffect(() =>{
    getProducts()
  },[])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Link to="">{text}</Link>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category',
      ...getColumnSearchProps('category_name'),
    },
    {
      title: 'Status',
      key: 'is_published',
      dataIndex: 'is_published',
      render: (status ) => (
        <>
        {
          status ? <Tag color={"blue"}>
          {"True"}
        </Tag>: 
          <Tag color={"red"}>
                {"False"}
              </Tag>
        }
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to=""
          style={{ color: "blue"}}
          >Stock In</Link>
          <Link to=""
          style={{ color: "red"}}
          >Stock Out</Link>
          <Link to=""
          style={{ color: "green"}}
          >Make Request</Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Inventory</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/products/">List</Link>
        </Breadcrumb.Item>
       </Breadcrumb>
      </div>
      <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>
        <Link to="/home/inventory/category/new"
                style={{ color:"blue" }}
        >New Category</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/products/new"
                style={{ color:"blue" }}
                >New Product</Link>
        </Breadcrumb.Item>
    </Breadcrumb>
      </div>      <div style={{ 
        marginTop : "20px"
      }}>
        <Table columns={columns} dataSource={products}/>
        </div>
    </div>
  )
}

export default InventoryStock

import React, {useEffect} from 'react'
import {Breadcrumb, Row, Col, Card} from 'antd'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../store/productSlice';

const InventoryCategory = () => {
  const dispatch = useDispatch()
  const {categories} = useSelector((store) => store.product)

  useEffect(() => {
    dispatch(getCategories())
  },[dispatch])

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
        <Link to="/home/inventory/products/"
                style={{ color:"blue" }}
        >List</Link>
        </Breadcrumb.Item>
       </Breadcrumb>
       </div>
      <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
              <Breadcrumb.Item>
        <Link to="/home/inventory/products/new"
        style={{ color:"blue" }}
        >New Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/category/new"
                        style={{ color:"blue" }}
        >New Category</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
        <Link to="/home/inventory/category/"
        >Category List</Link>
        </Breadcrumb.Item>
    </Breadcrumb>
      </div>
      <div className="site-layout-content"
      style={{ 
        minHeight: "280px",
        padding: "24px",
        background: "#fff"
      }}
      >
      <Row> 
        {
          categories.map(item => 
          <Col key = {item.catId} xs ={24} md={8} xl={8}>
            <Card>
            
              <p>{item.name.toUpperCase()} <span style =
              {{
                color:"blue",
                fontSize:"20px"}} 
              >{item.products_total}</span></p>
                <div style={{
                  display: "flex"
                }}>
                  <p
                  style={{
                    marginRight: "10px",
                    color:"blue",
                    fontSize:"10px"}} 
                  >View</p>
                  <p
                  style={{
                    marginRight: "10px",
                    color:"green",
                    fontSize:"10px"}} >Edit</p>
                  <p
                  style={{
                    color:"red",
                    fontSize:"10px"}} 
                  >Delete</p>
                </div>
            </Card>
          </Col>
          
          )
        }
        </Row> 
      </div>
    </div>
  )
}


export default InventoryCategory
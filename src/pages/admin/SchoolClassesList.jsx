import React , {useEffect, useState} from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';
import axios from 'axios';

const SchoolClassesList = () => {
  const [classes , setClasses] = useState([])

  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/basic/classes/").then((res) =>{
      setClasses(res.data)
    })

  },[])
  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Classes</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/home/admin/school-classes/new/" style={{ color: "blue"}}>
            Add
          </Link>
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
        { classes.map((item,index) => <div key={index}>
          <p>{index}) {item.name} {item.level}
          <span style={{
            marginLeft: "10px",marginRight: "10px",
            color: "green"
          }}>{item.total_students} </span>
          <span style={{
            color: "blue"
          }} >View</span></p>
        </div> )}
      </div>
    </div>
  )
}

export default SchoolClassesList
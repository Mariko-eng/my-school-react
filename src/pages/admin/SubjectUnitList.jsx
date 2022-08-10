import React, {useEffect,useState} from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router-dom';
import axios from 'axios'

const SubjectUnitList = () => {
  const [subjects , setSubjects] = useState([])

  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/basic/subjects/").then((res) =>{
      setSubjects(res.data)
    })

  },[])

  return (
    <div>
        <div>
        <Breadcrumb
          style={{
                margin: '16px 0',
              }}>
        <Breadcrumb.Item>Subjects</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/home/admin/subjects/new/" style={{ color: "blue"}}>
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
        { subjects.map((item,index) => <div key={index}>
          <p>{index}) {item.name} 
          <span 
          style={{
            color: "green"
          }}
          >({ item.name_short_form })</span>
          </p>
        </div> )}
      </div>
    </div>
  )
}

export default SubjectUnitList
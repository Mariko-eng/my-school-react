import React from 'react'
import { useState } from 'react'
import { AppBreadcrumb } from '../components'
import { Modal } from 'antd'
import { handleModal } from '../store/modalSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'  


const Dashbaord = () => {
  const [data, setData] = useState({});
  const { isDrawerOpen } = useSelector((store) => store.modal)
  const dispatch = useDispatch()
  // console.log(isDrawerOpen)

  const openModal = ({name,age,sex}) =>{
    // console.log(name)
    // console.log("Here")
    setData({name,age,sex})
    dispatch(handleModal())
  }

  const closeModal = () => {
    dispatch(handleModal())
  }

  
  return (
    <>
    <div>
      <AppBreadcrumb title="Dashboard" action1="Summary" />
      <div>Dashbaord</div>
      <br/>
      <button onClick={() => openModal({name :"james",age:29,sex:"male"}) }
      >Open</button>
      <br/>
      <p>{data.n}</p>
      {/* <button
        onClick={ 
          openModal
          (
            // {name:"mark",age:29,sex:"Male"}
            )
         }
      >Show Modal</button> */}

    </div>
    <Modal 
    title="New Product Information" 
    centered={true}
    maskClosable={false}
    visible={isDrawerOpen}
    width={800}
    footer={null} 
    onOk={ closeModal }
    onCancel={ closeModal } 
    // onCancel={handleCancel}
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>{data.name}</p>
      </Modal>
    </>
  )
}

export default Dashbaord
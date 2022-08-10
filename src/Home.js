import React from 'react'
import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import {Outlet} from 'react-router-dom'
import AppSideBar from './components/AppSideBar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSreenWidth } from './store/appSettingsSlice';

const Home = () => {
  const { activeMenu } = useSelector((store) => store.appSettings)
  const dispatch = useDispatch()
    // const [activeMenu, setActiveMenu] = useState(true);
    // const [sreenWidth, setScreenWidth] = useState()

    // const getInnerWidth = () => {
    //   let width = window.innerWidth;
    //   dispatch(setSreenWidth(width))
    //   // setScreenWidth(width)
    // }

    useEffect(() =>{
      // window.addEventListener('resize', getInnerWidth);
      window.addEventListener('resize', ()=>{
        let width = window.innerWidth;
        dispatch(setSreenWidth(width))
      });

    },[dispatch])

    // useEffect(() => {
    //   if (sreenWidth <= 800) {
    //     setActiveMenu(false);
    //   } else {
    //     setActiveMenu(true);
    //   }
    // }, [sreenWidth]); 

    const { Content, Footer } = Layout;
    return (
      <Layout
        style={{minHeight: '100vh',}}>
        { activeMenu &&
        <AppSideBar />
        }
        <Layout className="site-layout">
          { !activeMenu &&
          <Layout.Header
            style={{
              background: "grey"
            }}>
            <MenuOutlined style={{color:"blue"}} />
          </Layout.Header>
          }
          <Content
            style={{
              margin: '0 16px',
            }}>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}>

              <div style = {activeMenu 
              ? {marginLeft : "200px"} 
              : {marginLeft : "0px"}}>
                  <Outlet />
              </div>
             </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Amazing Work ©2018 Created by MarikoEng
          </Footer>
        </Layout>
      </Layout>
    );
}

export default Home
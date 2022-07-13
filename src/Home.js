import React from 'react'
import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useState, useEffect } from 'react';
import {Outlet} from 'react-router-dom'
import AppSideBar from './components/AppSideBar';

const Home = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [sreenWidth, setScreenWidth] = useState()

    const getInnerWidth = () => {
      let width = window.innerWidth;
      setScreenWidth(width)
    }
    useEffect(() =>{
      window.addEventListener('resize', getInnerWidth);
    },[])

    useEffect(() => {
      if (sreenWidth <= 800) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [sreenWidth]); 

    const { Content, Footer } = Layout;
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        { activeMenu &&
        <AppSideBar />
        }
        <Layout className="site-layout">
          { !activeMenu &&
          <Layout.Header
          style={{
            background: "grey"
          }}
          >
            <MenuOutlined style={{color:"blue"}} 
            // onClick = {
            //   () => setActiveMenu(!activeMenu)
            // }
             />
          </Layout.Header>}
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
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
import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import AppSideBar from "./components/AppSideBar";
import AdminSideMenu from "./components/side_menus/AdminSideMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSreenWidth } from "./store/appSettingsSlice";
import { toggleMenu } from "./store/appSettingsSlice";

const Home = () => {
  const { activeMenu } = useSelector((store) => store.appSettings);
  const dispatch = useDispatch();
  // const [activeMenu, setActiveMenu] = useState(true);
  // const [sreenWidth, setScreenWidth] = useState()

  // const getInnerWidth = () => {
  //   let width = window.innerWidth;
  //   dispatch(setSreenWidth(width))
  //   // setScreenWidth(width)
  // }

  useEffect(() => {
    // window.addEventListener('resize', getInnerWidth);
    window.addEventListener("resize", () => {
      let width = window.innerWidth;
      dispatch(setSreenWidth(width));
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (sreenWidth <= 800) {
  //     setActiveMenu(false);
  //   } else {
  //     setActiveMenu(true);
  //   }
  // }, [sreenWidth]);

  const { Content } = Layout;
  return (
    <>
      <div>
        {activeMenu && <AdminSideMenu />}
        <Layout className="site-layout">
          {/* <Layout.Header style={{ background:"white",color:"green" }}>
            <div>hgsndvgj</div>
          <MenuOutlined style={{ color: "blue" }} />
          <MenuOutlined style={{ color: "blue" }} />
          </Layout.Header> */}
          <Content
            style={{
              // margin: "0 10px",
              marginRight: "0",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                minHeight: 360,
              }}
            >
              <div
                style={
                  activeMenu ? { marginLeft: "200px" } : { marginLeft: "0px" }
                }
              >
                <div
                  style={{
                    width: "100%",
                    height: "80px",
                    background: "linear-gradient(grey, rgb(0, 21, 40))",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    marginBottom:"20px",
                  }}
                >
                  <div>
                  <MenuOutlined style={{ color: "white" }} onClick={() => dispatch(toggleMenu()) } />
                  </div>
                  { !activeMenu &&
                  <div style={{ color: "white" }}>
                    St Matia Mulumba Kireka.
                  </div>
                  }
                  
                </div>
                <div style={{
                  paddingLeft:"10px"
                }}>
                <Outlet />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default Home;

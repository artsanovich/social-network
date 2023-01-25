import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { authThunkCreator } from './redux/authReducer';
import React, { Suspense } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { initializedThunkCreator } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { AppStateType } from './redux/reduxStore';
import { useEffect } from 'react';
import { UsersContainer } from './components/Users/UsersContainer';
import { Login } from './components/Login/Login';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, MenuProps, Row } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { NavLink } from 'react-router-dom';
import { AppHeader } from './components/Header/Header';
import { HashRouter } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const App = (props: AppPropsFromConnect) => {

  useEffect(() => {
    props.initialized();
  }, [])

  const {token: { colorBgContainer } } = theme.useToken();
  

  return ( 
    <>
    <Layout>
      <AppHeader />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                <Menu.Item key="1"><NavLink to="/profile">profile</NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to="/dialogs">messages</NavLink></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                <Menu.Item key="5"><NavLink to="/users">Users</NavLink></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Suspense fallback={<div><Preloader /></div>}>
              <Routes>
                <Route path="/" element={<Navigate to={'profile'}/>}/>
                <Route 
                  path="/dialogs" 
                  element={
                    <DialogsContainer/>
                  }/>
                <Route path="/profile" element={<ProfileContainer/>}>
                  <Route path=":userId" element={<ProfileContainer/>}/>
                </Route>
                <Route 
                  path="/users" 
                  element={
                    <UsersContainer />
                }/>
                <Route 
                  path="/login" 
                  element={
                    <Login/>
                }/>
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>React Social Network</Footer>
    </Layout>
</>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  initializedSuccess: state.app.initializedSuccess
})


export type AppPropsFromConnect = ConnectedProps<typeof AppConnector>

const AppConnector = connect(mapStateToProps, {initialized: initializedThunkCreator})

export default AppConnector(App);







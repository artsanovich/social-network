import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/authSelectors';
import { useDispatch } from 'react-redux';
import { logoutThunkCreator } from '../../redux/authReducer';
import { AppDispatch } from '../../redux/reduxStore';

export const AppHeader = () => {

    const { Header } = Layout;

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch: AppDispatch = useDispatch()

    const logout = () => {
        dispatch(logoutThunkCreator())
    }


    return (

        <Header className="header">
            <Row>
                <Col span={20}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><NavLink to="/profile">My Profile</NavLink></Menu.Item>
                </Menu>
                </Col>
                <Col span={4}>
                    
                    {isAuth
                        ? <div className={classes.username}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />
                            {` ${login} `} <Button onClick={logout}>Log out</Button>
                        </div>
                        : <NavLink to={'/login'}><Button>Log in</Button></NavLink>}
                </Col>
            </Row>
      </Header>
    )
}


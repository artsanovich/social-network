import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import axios from 'axios';
import { connect, ConnectedProps } from 'react-redux';
import {authThunkCreator, actions, logoutThunkCreator} from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore';

const HeaderContainer = (props: HeaderPropsFromConnect) => {
    return (
        <Header {...props}/>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export type HeaderPropsFromConnect = ConnectedProps<typeof HeaderConnector>

const HeaderConnector = connect(mapStateToProps, {setAuthUserDataCreator: actions.setAuthUserDataCreator, auth: authThunkCreator, logout: logoutThunkCreator})

export default HeaderConnector(HeaderContainer)
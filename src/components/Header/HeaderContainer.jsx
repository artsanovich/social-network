import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import {authThunkCreator, setAuthUserDataCreator, logoutThunkCreator} from '../../redux/authReducer'

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect (mapStateToProps, {setAuthUserDataCreator, auth: authThunkCreator, logout: logoutThunkCreator})(HeaderContainer);
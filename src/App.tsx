import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from "./components/Users/UsersContainer";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import { authThunkCreator } from './redux/authReducer';
import React, { Suspense } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { initializedThunkCreator } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { AppStateType } from './redux/reduxStore';
import { useEffect } from 'react';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const App = (props: AppPropsFromConnect) => {

  useEffect(() => {
    props.initialized();
  }, [])

  return ( 
    <Router>
        <div className="app-wrapper">
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
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
            </div>
        </div>
    </Router>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  initializedSuccess: state.app.initializedSuccess
})


export type AppPropsFromConnect = ConnectedProps<typeof AppConnector>

const AppConnector = connect(mapStateToProps, {initialized: initializedThunkCreator})

export default AppConnector(App);
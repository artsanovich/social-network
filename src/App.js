import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from "./components/Users/UsersContainer";
import {BrowserRouter as Router, Route, Routes, HashRouter} from 'react-router-dom';
import LoginPage from './components/Login/Login';
import { authThunkCreator } from './redux/authReducer';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { initializedThunkCreator } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

  componentDidMount() {
    this.props.initialized();
}

  render() {
    if(!this.props.initializedSuccess) {
      return <Preloader />
    }

    return (
      <HashRouter>
          <div className="app-wrapper">
              <HeaderContainer />
              <Navbar />
              <div className='app-wrapper-content'>
                <Suspense fallback={<div><Preloader /></div>}>
                  <Routes>
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
                        <UsersContainer/>
                    }/>
                    <Route 
                      path="/login" 
                      element={
                        <LoginPage/>
                    }/>
                  </Routes>
                </Suspense>
              </div>
          </div>
      </HashRouter>
    );
  }
}
const mapStateToProps = (state) => ({
  initializedSuccess: state.app.initializedSuccess
})

export default connect(mapStateToProps, {initialized: initializedThunkCreator})(App);
import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import {setUserProfileCreator, setUserProfileThunkCreator, getStatusTextThunkCreator, updateStatusTextThunkCreator} from '../../redux/profileReducer'
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import { usersAPI } from '../../api/Api';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
  return(props) => {
      const match = {params: useParams()}
      return (
          <Component
              {...props}
              router={match}
          />
      );
  }

}

class ProfileContainer extends React.Component {

componentDidMount() {
  let userId = this.props.router.params.userId;
  if(!userId) {
    userId = 27158;
  }
  this.props.setUserProfile(userId)
  this.props.getStatusText(userId)
}

render() {
  return (
      <Profile {...this.props} profile={this.props.profile} statusText={this.props.statusText} updateStatusText={this.props.updateStatusText}/>      
  )}
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  statusText: state.profilePage.statusText
})

export default compose(
  connect(mapStateToProps, {setUserProfile: setUserProfileThunkCreator, getStatusText: getStatusTextThunkCreator, updateStatusText: updateStatusTextThunkCreator}),
  withRouter,
  WithAuthRedirect)
  (ProfileContainer)



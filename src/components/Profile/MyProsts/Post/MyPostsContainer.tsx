import React from 'react';
import { actions } from '../../../../redux/profileReducer';
import MyPosts from './MyPosts';
import {connect, ConnectedProps} from 'react-redux'
import { AppDispatch, AppStateType } from '../../../../redux/reduxStore';


const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addPost: (newPostText: string) => {
      dispatch(actions.addPostCreator(newPostText));
    }
  }
}

export type MyPostsPropsFromConnect = ConnectedProps<typeof MyPostConnector>

const MyPostConnector = connect(mapStateToProps, mapDispatchToProps)

export default MyPostConnector(MyPosts);
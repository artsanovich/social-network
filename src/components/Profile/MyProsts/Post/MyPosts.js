import React from 'react';
import classes from './MyPosts.module.css'
import { updateNewPostTextCreator, addPostCreator } from '../../../../redux/profileReducer';
import Post from './Post';
import {Formik, Form, Field, ErrorMessage} from "formik";
import addNewPostFormSchema from "../../../FormValidation/AddNewPostFormSchema";


const MyPosts = (props) => {

  const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

  const newPostElement = React.createRef();

  const onPostChange = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <AddNewPostForm {...props} />
      </div>
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  )
}

const AddNewPostForm = (props) => {

  const onAddPost = (values) => {
    props.addPost(values.newPostText);
  }
  
  return (
      <div>
          <h1>Add Message</h1>
          <Formik
              initialValues={{newPostText: ""}}
              validate={values => {
                  const errors = {};
                  if (!values.newPostText) {
                      errors.newPostText = 'Required';
                  } 
                  return errors;
              }}
              onSubmit={(values) => {
                onAddPost(values)
              }}
              validationSchema={addNewPostFormSchema}>
              {() => (
                  <Form>
                      <div>
                          <Field type={'text'} name={'newPostText'} placeholder={'add post...'}/>
                      </div>
                      <ErrorMessage name="newPostText" component="div"/>

                      <button type={'submit'}>Send</button>
                  </Form>
              )}
          </Formik>
      </div>
  );
}


export default MyPosts;
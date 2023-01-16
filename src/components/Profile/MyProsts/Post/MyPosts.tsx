import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post';
import {Formik, Form, Field, ErrorMessage, FormikErrors} from "formik";
import addNewPostFormSchema from "../../../FormValidation/AddNewPostFormSchema";
import { MyPostsPropsFromConnect } from './MyPostsContainer';


const MyPosts = (props: MyPostsPropsFromConnect) => {

  const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);
  
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

const AddNewPostForm = (props: MyPostsPropsFromConnect) => {

  type FormValues = {
    newPostText: string
  }

  const initialValues: FormValues = {
    newPostText: ""
  }

  const onAddPost = (values: FormValues) => {
    props.addPost(values.newPostText);
  }
  
  return (
      <div>
          <h1>Add Message</h1>
          <Formik
              initialValues={initialValues}
              validate={values => {
                  const errors: FormikErrors<FormValues> = {};
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
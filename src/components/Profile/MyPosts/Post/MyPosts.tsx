import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post';
import {Formik, Form, Field, ErrorMessage, FormikErrors} from "formik";
import addNewPostFormSchema from "../../../FormValidation/AddNewPostFormSchema";
import { MyPostsPropsFromConnect } from './MyPostsContainer';


const MyPosts = (props: MyPostsPropsFromConnect) => {

  const postsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);
  
  return (
    <div className={classes.postsBlock}>
      <h3 className={classes.postsTitle}>My Posts</h3>
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

  let initialValues: FormValues = {
    newPostText: ""
  }

  const onAddPost = (values: FormValues) => {
    props.addPost(values.newPostText);
  }
  
  return (
      <div className={classes.messageForm}>
          <h1 className={classes.messageTitle}>Add Message</h1>
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
                values.newPostText = ''
              }}
              validationSchema={addNewPostFormSchema}>
              {() => (
                  <Form>
                      <div className={classes.messageInput}>
                          <Field type={'text'} name={'newPostText'} placeholder={'add post...'}/>
                      </div>
                      <ErrorMessage name="newPostText" component="div"/>

                      <button className={classes.messageSubmit} type={'submit'}>Send</button>
                  </Form>
              )}
          </Formik>
      </div>
  );
}


export default MyPosts;
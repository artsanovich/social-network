import React from "react";
import { Navigate, NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem'
import Message from "./Message/Message";
import classes from './Dialogs.module.css';
import {Formik, Form, Field, ErrorMessage, FormikErrors} from "formik";
import { DialogsPropsFromConnect } from "./DialogsContainer";



const Dialogs = (props: DialogsPropsFromConnect) => {

    const state = props.dialogsPage;

    const dialogsElement = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    const messagesElement = state.messages.map(m => <Message message={m.message} />);

    if(!props.isAuth) return <Navigate to={'/login'} />

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                { dialogsElement }
            </div>
            <div className={classes.messages}>
                <div>
                    { messagesElement }
                </div>
                <div>
                   <AddMessageForm {...props}/>
                </div>
            </div>
        </div>
    )
}

const AddMessageForm = (props: DialogsPropsFromConnect) => {

    type FormValues = typeof initialValues

    const initialValues = {
        newMessageBody: ''
    }

    const addNewMessage = (values: FormValues) => {
        props.sendMessage(values.newMessageBody)
    }
    
    return (
        <div>
            <h1>Add Message</h1>
            <Formik
                initialValues={{newMessageBody: ""}}
                validate={values => {
                    const errors: FormikErrors<FormValues> = {};
                    if (!values.newMessageBody) {
                        errors.newMessageBody = 'Required';
                    } 
                    return errors;
                }}
                onSubmit={(values) => {
                    addNewMessage(values)
                    values.newMessageBody = ''
                }}>
                {() => (
                    <Form>
                        <div className={classes.messageInput}>
                            <Field type={'text'} name={'newMessageBody'} placeholder={'add message...'}/>
                            <ErrorMessage name="newMessageBody" component="div"/>
                        </div>

                        <button className={classes.submitButton} type={'submit'}>Send</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Dialogs;
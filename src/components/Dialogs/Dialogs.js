import React from "react";
import { Navigate, NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem'
import Message from "./Message/Message";
import classes from './Dialogs.module.css';
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogsReducer";
import {Formik, Form, Field, ErrorMessage} from "formik";
import addMessageFormSchema from "../FormValidation/AddMessageFormSchema";


const Dialogs = (props) => {

    const state = props.dialogsPage;

    const dialogsElement = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    const messagesElement = state.messages.map(m => <Message message={m.message} />);
    const newMessageBody = state.newMessageBody;

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

const AddMessageForm = (props) => {

    const addNewMessage = (values) => {
        console.log(props.sendMessage)
        props.sendMessage(values.newMessageBody)
    }
    
    return (
        <div>
            <h1>Add Message</h1>
            <Formik
                initialValues={{newMessageBody: ""}}
                validate={values => {
                    const errors = {};
                    if (!values.newMessageBody) {
                        errors.newMessageBody = 'Required';
                    } 
                    return errors;
                }}
                onSubmit={(values) => {
                    addNewMessage(values)
                }}
                validationSchema={addMessageFormSchema}>
                {() => (
                    <Form>
                        <div>
                            <Field type={'text'} name={'newMessageBody'} placeholder={'add message...'}/>
                        </div>
                        <ErrorMessage name="newMessageBody" component="div"/>

                        <button type={'submit'}>Send</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Dialogs;
import { FC } from "react";
import {Formik, Form, Field, ErrorMessage, FormikErrors, FormikProps} from "formik";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginThunkCreator, logoutThunkCreator } from "../../redux/authReducer";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { AppDispatch, AppStateType } from "../../redux/reduxStore";
import classes from './Login.module.css'
import { Button } from 'antd';


export const Login = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    if(isAuth) return <Navigate to={'/profile'} />

    return(
        <div>
            <h1 className={classes.loginTitle}>Login</h1>
            <LoginForm captchaUrl={captchaUrl} isAuth={isAuth}/>
        </div>
    );
}

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type LoginFormPropsType = {
    captchaUrl: string | null
    isAuth: boolean | null
}

const LoginForm = (props: LoginFormPropsType) => {

    const dispatch: AppDispatch = useDispatch()

    const initialValues: LoginFormValuesType = {
        email: "artur.kartsan.silva@gmail.com",
        password: "adminadmin",
        rememberMe: false,
        captcha: ""
    }

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors: FormikErrors<LoginFormValuesType> = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                } 
                return errors;
            }}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                await dispatch(loginThunkCreator(values.email, values.password, values.rememberMe, values.captcha, setStatus))
                await setSubmitting(false)
            }}
            validationSchema={loginFormSchema}>
            {({isSubmitting, status}) => (
                <Form>
                    <div>
                        <Field className={classes.loginInput} type={'text'} name={'email'} placeholder={'e-mail'}/>
                    </div>
                    <ErrorMessage name="email" component="div"/>

                    <div>
                        <Field className={classes.loginInput} type={'password'} name={'password'} placeholder={'password'}/>
                    </div>
                    <ErrorMessage name="password" component="div"/>

                    <div className={classes.loginInput}>
                        <Field type={'checkbox'} name={'rememberMe'}/>
                        <label htmlFor={'rememberMe'}> remember me </label>
                    </div>
                    <div>{status}</div>
                    {props.captchaUrl && <img src={props.captchaUrl} />}
                    <div>{props.captchaUrl && <Field type={'text'} name={'captcha'}/>}</div>
                    <div>
                        <button className={classes.submitButton} type={'submit'} disabled={isSubmitting}>Log in</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

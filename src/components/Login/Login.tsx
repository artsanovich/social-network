import { FC } from "react";
import {Formik, Form, Field, ErrorMessage, FormikErrors, FormikProps} from "formik";
import { connect, ConnectedProps } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginThunkCreator, logoutThunkCreator } from "../../redux/authReducer";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { AppStateType } from "../../redux/reduxStore";


const Login = (props: PropsFromConnect) => {

    if(props.isAuth) return <Navigate to={'/profile'} />

    return(
        <div>
            <h1>Login</h1>
            <LoginForm {...props}/>
        </div>
    );
}

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

const LoginForm = (props: PropsFromConnect) => {

    const initialValues: LoginFormValuesType = {
        email: "",
        password: "",
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
            onSubmit={(values, { setSubmitting, setStatus }) => {
                console.log(values)
                props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
                    .then(() => setSubmitting(false))
            }}
            validationSchema={loginFormSchema}>
            {({isSubmitting, status}) => (
                <Form>
                    <div>
                        <Field type={'text'} name={'email'} placeholder={'e-mail'}/>
                    </div>
                    <ErrorMessage name="email" component="div"/>

                    <div>
                        <Field type={'password'} name={'password'} placeholder={'password'}/>
                    </div>
                    <ErrorMessage name="password" component="div"/>

                    <div>
                        <Field type={'checkbox'} name={'rememberMe'}/>
                        <label htmlFor={'rememberMe'}> remember me </label>
                    </div>
                    <div>{status}</div>
                    <div>{isSubmitting.toString()}</div>
                    {props.captchaUrl && <img src={props.captchaUrl} />}
                    <div>{props.captchaUrl && <Field type={'text'} name={'captcha'}/>}</div>
                    <div><button type={'submit'} disabled={isSubmitting}>Log in</button></div>
                </Form>
            )}
        </Formik>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

type PropsFromConnect = ConnectedProps<typeof LoginConnector>

const LoginConnector = connect(mapStateToProps, {login: loginThunkCreator, logout: logoutThunkCreator});

export default LoginConnector(Login)
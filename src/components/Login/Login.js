import {Formik, Form, Field, ErrorMessage} from "formik";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginThunkCreator, logoutThunkCreator } from "../../redux/authReducer";
import loginFormSchema from "../FormValidation/LoginFormSchema";

const Login = (props) => {

    if(props.isAuth) return <Navigate to={'/profile'} />

    return(
        <div>
            <h1>Login</h1>
            <LoginForm {...props}/>
        </div>
    );
}

const LoginForm = (props) => {
    
    return (
        <Formik
            initialValues={{email: "", password: "", rememberMe: false}}
            validate={values => {
                const errors = {};
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
                props.login(values.email, values.password, values.rememberMe, setStatus)
                setSubmitting(false);
            }}
            validationSchema={loginFormSchema}>
            {({errors, touched, isValid, dirty, status}) => (
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
                    <button type={'submit'} disabled={Formik.isSubmitting}>Log in</button>
                </Form>
            )}
        </Formik>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login: loginThunkCreator, logout: logoutThunkCreator})(Login);
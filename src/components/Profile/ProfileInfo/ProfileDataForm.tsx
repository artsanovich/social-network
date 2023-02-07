import {Formik, FormikProps, Form, Field, ErrorMessage} from "formik";
import { FC } from "react";
import { ProfileType } from "../../../types/Types";
import ProfileDataFormSchema from "../../FormValidation/ProfileDataFormSchema";
import classes from './ProfileDataForm.module.css'

type FormProps = {
    profile: ProfileType,
    onSubmit: (values: ProfileType) => void
}


const ProfileDataForm: FC<FormProps> = ({profile, onSubmit}: FormProps) => {
    return (
    <Formik
        initialValues={profile}
        onSubmit={(values) => {
            onSubmit(values)
        }}
        validationSchema={ProfileDataFormSchema}>
        {() => (
            <Form>
                <div>
                    <b>Full name: </b> 
                    <Field type={'text'} name={'fullName'} placeholder={'add name...'}/>
                    <ErrorMessage name="fullName" component="span"/>
                </div>
                <div>
                    <b>Looking for a job: </b> 
                    <Field type={'checkbox'} name={'lookingForAJob'}/>
                </div>
                <div>
                    <b>My profesional skills: </b> 
                    <Field type={'textarea'} name={'lookingForAJobDescription'} placeholder={'add skills...'}/>
                    <ErrorMessage name="lookingForAJobDescription" component="span"/>
                </div>
                <div>
                    <b>About me: </b> 
                    <Field type={'textarea'} name={'aboutMe'} placeholder={'add smth about...'}/>
                    <ErrorMessage name="aboutMe" component="span"/>
                </div>
                <div><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return (
                        <div className={classes.contact}>
                            <b>{key}: </b>
                            <Field type={'text'} name={`contacts.${key}`} placeholder={key}/>
                            <ErrorMessage name={`contacts.${key}`} component="span"/>
                        </div>
                    )
                    })}
                </div>
                <button className={classes.submitButton} type={'submit'}>Save</button>
            </Form>
          )}
    </Formik>
    )
  }

  export default ProfileDataForm
import {Formik, Form, Field, ErrorMessage} from "formik";
import ProfileDataFormSchema from "../../FormValidation/ProfileDataFormSchema";
import classes from './ProfileInfo.module.css'


const ProfileDataForm = ({profile, onSubmit}) => {
    return (
    <Formik
        initialValues={profile}
        onSubmit={(values) => {
            onSubmit(values)
        }}
        validationSchema={ProfileDataFormSchema}>
        {() => (
            <Form>
                <button type={'submit'}>Save</button>
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
            </Form>
          )}
    </Formik>
    )
  }

  export default ProfileDataForm
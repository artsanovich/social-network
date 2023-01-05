import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatusСlass';
import userPhoto from '../../../assets/images/user-icon.png'
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {

      return <Preloader />
    }

    const mainPhotoSelected = (e) => {
      if(e.target.files.length) {
        props.savePhoto(e.target.files[0])
      }
    }
    
    const onSubmit = (formData) => {
      props.saveProfile(formData)
      setEditMode(false)
    }

    return (
      <div>
        <div className={classes.descriptionBlock}>
          <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto} alt="" />
          {props.isOwner && <input type={'file'} onChange={mainPhotoSelected}/>}
          
          {editMode ? <ProfileDataForm profile={props.profile} onSubmit={onSubmit}/> 
          : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/>}
      
          <ProfileStatus statusText={props.statusText} updateStatusText={props.updateStatusText}/>
        </div>
      </div>
    )
}



const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return (
    <div>
      {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
      <div><b>Full name: </b> {profile.fullName}</div>
      <div><b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob &&
        <div><b>My profesional skills:</b> {profile.lookingForAJobDescription}</div>
      }
      <div><b>About me:</b> {profile.aboutMe}</div>
      <div><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
        return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>
      })}</div>
    </div>
  ) 
}

const Contact = ({contactTitle, contactValue}) => {
  return <div className={classes.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;
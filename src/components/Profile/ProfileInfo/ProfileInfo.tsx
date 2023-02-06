import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css'
import '../../../App.css'

import ProfileStatus from './ProfileStatus/ProfileStatusСlass';
import userPhoto from '../../../assets/images/user-icon.png'
import { useState, ChangeEvent } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/Types';
import { Button } from 'antd';

type PropsType = {
  profile: ProfileType
  statusText: string,
  updateStatusText: (statusText: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo = (props: PropsType) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {

      return <Preloader />
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files?.length) {
        props.savePhoto(e.target.files[0])
      }
    }
    
    const onSubmit = (formData: ProfileType) => {
      props.saveProfile(formData)
      setEditMode(false)
    }

    return (
      <div>
        <div className={classes.descriptionBlock}>
          <div className={props.isOwner ? classes.ownerImageBlock : classes.userImageBlock}>
            <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto} alt="" />
            {props.isOwner && 
              <Button className={classes.fileUploadButton}>
                <label className={classes.fileUploadLabel}>
                  Choose File
                  <input type={'file'} onChange={mainPhotoSelected} className={classes.fileUploadInput}></input>
                </label>
              </Button>}
          </div>
          <ProfileStatus statusText={props.statusText} updateStatusText={props.updateStatusText} isOwner={props.isOwner}/>
          {editMode ? <ProfileDataForm profile={props.profile} onSubmit={onSubmit}/> 
          : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/>}
        </div>
      </div>
    )
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
  return (
    <div className={classes.infoBlock}>
      <div className={classes.infoElement}><b>Full name: </b> {profile.fullName}</div>
      <div className={classes.infoElement}><b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob &&
        <div className={classes.infoElement}><b>My profesional skills:</b> {profile.lookingForAJobDescription}</div>
      }
      <div className={classes.infoElement}><b>About me:</b> {profile.aboutMe}</div>
      <div className={classes.infoElement}><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
        return <Contact contactTitle={key} key={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
      })}</div>
      {isOwner && <div><Button onClick={goToEditMode}>Edit</Button></div>}
    </div>
  ) 
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact = ({contactTitle, contactValue}: ContactsPropsType) => {
  return <div className={classes.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;
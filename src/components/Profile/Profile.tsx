import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyProsts/Post/MyPostsContainer';
import { ProfileType } from '../../types/Types';
import classes from './Profile.module.css'

type PropsType = {
  profile: ProfileType
  statusText: string
  updateStatusText: (statusText: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile = (props: PropsType) => {
    return (
      <div className={classes.profileWrapper}>
        <div className={classes.profileInfoWrapper}>
          <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} statusText={props.statusText} updateStatusText={props.updateStatusText}/>
        </div>
        {props.isOwner && 
          <div>
            <MyPostsContainer />
          </div>
      }
    </div>
    )
}

export default Profile;
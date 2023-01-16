import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyProsts/Post/MyPostsContainer';
import { ProfileType } from '../../types/Types';

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
      <div>
        <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} statusText={props.statusText} updateStatusText={props.updateStatusText}/>
    </div>
    )
}

export default Profile;
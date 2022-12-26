import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyProsts/Post/MyPostsContainer';


const Profile = (props) => {
    return (
      <div>
        <ProfileInfo profile={props.profile} statusText={props.statusText} updateStatusText={props.updateStatusText}/>
        <MyPostsContainer 
          store={props.store}
        />
    </div>
    )
}

export default Profile;
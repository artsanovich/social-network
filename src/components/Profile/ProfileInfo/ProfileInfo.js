import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatusСlass';


const ProfileInfo = (props) => {

    if (!props.profile) {

      return <Preloader />
    }

    return (
      <div>
        <div>
         {/* <img src="https://media.az/photo/880x470/2022/07/27/1658946371_21618.jpg" alt="" /> */}
        </div>
        <div className={classes.descriptionBlock}>
          <img src={props.profile.photos.large} alt="" />
          <ProfileStatus statusText={props.statusText} updateStatusText={props.updateStatusText}/>
        </div>
      </div>
    )
}

export default ProfileInfo;
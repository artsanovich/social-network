import React from "react";
import userPhoto from '../../assets/images/user-icon.png'
import classes from './Users.module.css'
import { NavLink } from 'react-router-dom';
import { usersAPI } from "../../api/Api";
import Paginator from '../Paginator/Paginator'



const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {    
    
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount} pageSize={pageSize}/>
    {
    users.map(user => 
    <div key={user.id}>
        <span>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={classes.userPhoto}  />
                </NavLink>
            </div>
            <div>
                {user.followed ? 
                <button disabled={props.followingProgress.some(id => id === user.id)}
                    onClick={() => props.unfollow(user.id)}>Unfollow</button>
                 :
                <button disabled={props.followingProgress.some(id => id === user.id)}
                    onClick={() => props.follow(user.id)}>Follow</button>}
            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                {/* <div>{user.location.country}</div>
                <div>{user.location.city}</div> */}
            </span>
        </span>
    </div>
    )}
</div>

}

export default Users;
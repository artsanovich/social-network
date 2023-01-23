import React, { useEffect } from "react";
import userPhoto from '../../assets/images/user-icon.png'
import classes from './Users.module.css'
import { NavLink } from 'react-router-dom';
import Paginator from '../Paginator/Paginator'
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/usersSelectors";
import { followThunkCreator, requestUsersThunkCreator, unfollowThunkCreator } from "../../redux/usersReducer";
import { AppDispatch } from "../../redux/reduxStore";
import { Button } from 'antd';



export const Users = ({ ...props}) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const followingProgress = useSelector(getFollowingProgress)

    const dispatch: AppDispatch = useDispatch()

    const follow = (userId: number) => {
        dispatch(followThunkCreator(userId))

    }

    const unfollow = (userId: number) => {
        dispatch(unfollowThunkCreator(userId))
    }

    const onPageChanged = (page: number) => {
        dispatch(requestUsersThunkCreator(page, pageSize));
    }


    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    

    return <div>
    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount} pageSize={pageSize}/>
    {
    users.map(user => 
    <div key={user.id} className={classes.user}>
        <span>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={classes.userPhoto}  />
                </NavLink>
            </div>
        </span>
        <div>
            <span>
                <div className={classes.userName}>{user.name}</div>
                <div className={classes.userStatus}>{user.status}</div>
            </span>
        </div>
        <div>
                {user.followed ? 
                <Button disabled={followingProgress.some(id => id === user.id)}
                    onClick={() => unfollow(user.id)}>Unfollow</Button>
                 :
                <Button type='primary' disabled={followingProgress.some(id => id === user.id)}
                    onClick={() => follow(user.id)}>Follow</Button>}
        </div>
    </div>
    )}
</div>

}

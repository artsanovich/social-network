import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getPageSize, getFollowingProgress, getIsFetching, getCurrentPage, getTotalUsersCount, getUsersSelector } from "../../redux/usersSelectors";
import {followThunkCreator, unfollowThunkCreator, requestUsersThunkCreator} from '../../redux/usersReducer'
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";
import { UserType } from "../../types/Types";
import { FC } from "react";
import { AppStateType } from "../../redux/reduxStore";


const UsersContainer = (props: UsersPropsFromConnect) => {
    
    useEffect(() => {
        props.requestUsers(props.currentPage, props.pageSize);
    }, [])

    const onRequestUsers = (page: number) => {
        props.requestUsers(page, props.pageSize);
    }

    return (<>
            {
                props.isFetching ? 
                <Preloader/>
                : <Users
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    onPageChanged={onRequestUsers}
                    users={props.users}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    followingProgress={props.followingProgress}
                />
            }   
            </>) 
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}


export type UsersPropsFromConnect = ConnectedProps<typeof UsersConnector>

const UsersConnector = connect(mapStateToProps, {
             follow: followThunkCreator,
             unfollow: unfollowThunkCreator,
             requestUsers: requestUsersThunkCreator,
            })

export default compose<React.ComponentType>(UsersConnector)(UsersContainer)

import React from "react";
import { connect } from "react-redux";
import { getPageSize, getFollowingProgress, getIsFetching, getCurrentPage, getTotalUsersCount, getUsersSelector } from "../../redux/usersSelectors";
import {followThunkCreator, unfollowThunkCreator, setUsersCreator, setCurrentPageCreator, setTotalUsersCountCreator, toggleIsFetchingCreator, toggleFollowingProgressCreator, requestUsersThunkCreator} from '../../redux/usersReducer'
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";

class UsersContainer extends React.Component {
    
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page) => {
        this.props.requestUsers(page, this.props.pageSize);
    }

    render() {

        return (<>
                {
                    this.props.isFetching ? 
                    <Preloader/>
                    : <Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        toggleFollowingProgress={this.props.toggleFollowingProgress}
                        followingProgress={this.props.followingProgress}
                    />
                }   
                </>) 
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator,
        setCurrentPage: setCurrentPageCreator,
        toggleFollowingProgress: toggleFollowingProgressCreator,
        requestUsers: requestUsersThunkCreator,
        })
)(UsersContainer)
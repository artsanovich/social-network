import { usersAPI } from "../api/Api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case SET_USERS: 
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFetching 
                ? [...state.followingProgress, action.userId]
                : state.followingProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
}

export const followCreator = (userId) => ({
    type: FOLLOW,
    userId
})

export const unfollowCreator = (userId) => ({
    type: UNFOLLOW,
    userId
})

export const setUsersCreator = (users) => ({type: SET_USERS, users})

export const setCurrentPageCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})

export const setTotalUsersCountCreator = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

export const toggleIsFetchingCreator = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const toggleFollowingProgressCreator = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsersThunkCreator = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(toggleIsFetchingCreator(true))
        dispatch(setCurrentPageCreator(currentPage))

        const data = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(setUsersCreator(data.items))
            dispatch(setTotalUsersCountCreator(data.totalCount))
            dispatch(toggleIsFetchingCreator(false))
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgressCreator(true, userId))
    const resp = await apiMethod(userId)
        if(resp.data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
    dispatch(toggleFollowingProgressCreator(false, userId))
}

export const followThunkCreator = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followCreator)
    }
}

export const unfollowThunkCreator = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), unfollowCreator)
    }
}


export default usersReducer;
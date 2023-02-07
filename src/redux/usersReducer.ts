import { Dispatch } from "react";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/users-api";
import { PhotosType, UserType } from "../types/Types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<number>
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case 'SET_USERS': 
            return {...state, users: [...action.users]}
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingProgress: action.isFetching 
                ? [...state.followingProgress, action.userId]
                : state.followingProgress.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {

    followCreator: (userId: number) => ({type: 'FOLLOW', userId} as const),

    unfollowCreator: (userId: number) => ({type: 'UNFOLLOW', userId} as const),

    setUsersCreator: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPageCreator: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),

    setTotalUsersCountCreator: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),

    toggleIsFetchingCreator: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingProgressCreator: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),

}


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export const requestUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {

    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(actions.toggleIsFetchingCreator(true))
        dispatch(actions.setCurrentPageCreator(currentPage))

        const data = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(actions.setUsersCreator(data.items))
            dispatch(actions.setTotalUsersCountCreator(data.totalCount))
            dispatch(actions.toggleIsFetchingCreator(false))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgressCreator(true, userId))
    const resp = await apiMethod(userId)
        if(resp.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
    dispatch(actions.toggleFollowingProgressCreator(false, userId))
}

export const followThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followCreator)
    }
}

export const unfollowThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowCreator)
    }
}


export default usersReducer;
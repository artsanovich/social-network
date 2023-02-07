import { ResultCodeEnum } from "../api/Api";
import { PhotosType, PostType, ProfileType } from "../types/Types";
import { ThunkAction } from 'redux-thunk';
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";
import { profileAPI } from '../api/profile-api';
import { usersAPI } from "../api/users-api";

const initialState = {
    posts: [
        {id: 1, message: 'Hey', likesCount: 12},
        {id: 2, message: 'How are you?', likesCount: 15},
        {id: 3, message: 'Nice to meet you', likesCount: 22},
        {id: 4, message: 'Whats new today?', likesCount: 9},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    statusText: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'profile/ADD_POST':
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 2
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case 'profile/SET_STATUS_TEXT': 
            return {
                ...state,
                statusText: action.statusText
            }
        case 'profile/SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 'profile/SAVE_PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}

export const actions = {

    addPostCreator: (newPostText: string) => ({
        type: 'profile/ADD_POST',
        newPostText
    } as const),

    setUserProfileCreator: (profile: ProfileType) => ({
        type: 'profile/SET_USER_PROFILE',
        profile
    } as const),

    setStatusTextCreator: (statusText: string) => ({
        type: 'profile/SET_STATUS_TEXT',
        statusText
    } as const),

    savePhotoCreator: (photos: PhotosType) => ({
        type: 'profile/SAVE_PHOTO',
        photos
    } as const)

}

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>


export const setUserProfileThunkCreator = (userId: number | null): ThunkType => {

    return async (dispatch) => {
        const data = await profileAPI.setProfile(userId)
            dispatch(actions.setUserProfileCreator(data))
    }
}

export const getStatusTextThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {
        const data = await profileAPI.getStatusText(userId)
            dispatch(actions.setStatusTextCreator(data))
    }
}

export const updateStatusTextThunkCreator = (statusText: string): ThunkType => {

    return async (dispatch) => {
        const data = await profileAPI.updateStatusText(statusText)
            if(data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.setStatusTextCreator(statusText))
            }
    }
}

export const savePhotoThunkCreator = (file: File): ThunkType => {

    return async (dispatch) => {
        const resp = await profileAPI.savePhoto(file)
            if(resp.data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.savePhotoCreator(resp.data.data.photos))
            }
    }
}

export const saveProfileThunkCreator = (profile: ProfileType): ThunkType => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const data = await profileAPI.saveProfile(profile)
            if(data.resultCode === ResultCodeEnum.Success) {
                dispatch(setUserProfileThunkCreator(userId))
            }
    }
}

export default profileReducer;
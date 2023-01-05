import { usersAPI, profileAPI } from "../api/Api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS_TEXT = "SET-STATUS-TEXT";
const SAVE_PHOTO = "SAVE-PHOTO"

const initialState = {
    posts: [
        {id: 1, message: 'Hey', likesCount: 12},
        {id: 2, message: 'How are you?', likesCount: 15},
        {id: 3, message: 'Nice to meet you', likesCount: 22},
        {id: 4, message: 'Whats new today?', likesCount: 9},
    ],
    profile: null,
    statusText: ''
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
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
        case SET_STATUS_TEXT: 
            return {
                ...state,
                statusText: action.statusText
            }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SAVE_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}

export const addPostCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText
})

export const setUserProfileCreator = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})

export const setStatusTextCreator = (statusText) => ({
    type: SET_STATUS_TEXT,
    statusText
})

export const savePhotoCreator = (photos) => ({
    type: SAVE_PHOTO,
    photos
})

export const setUserProfileThunkCreator = (userId) => {

    return async (dispatch) => {
        const resp = await usersAPI.setProfile(userId)
            dispatch(setUserProfileCreator(resp.data))
    }
}

export const getStatusTextThunkCreator = (userId) => {

    return async (dispatch) => {
        const resp = await profileAPI.getStatusText(userId)
            dispatch(setStatusTextCreator(resp.data))
    }
}

export const updateStatusTextThunkCreator = (statusText) => {

    return async (dispatch) => {
        const resp = await profileAPI.updateStatusText(statusText)
            if(resp.data.resultCode === 0) {
                dispatch(setStatusTextCreator(statusText))
            }
    }
}

export const savePhotoThunkCreator = (file) => {

    return async (dispatch) => {
        const resp = await profileAPI.savePhoto(file)
            if(resp.data.resultCode === 0) {
                dispatch(savePhotoCreator(resp.data.data.photos))
            }
    }
}

export const saveProfileThunkCreator = (profile) => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const resp = await profileAPI.saveProfile(profile)
            if(resp.data.resultCode === 0) {
                dispatch(setUserProfileThunkCreator(userId))
            }
    }
}

export default profileReducer;
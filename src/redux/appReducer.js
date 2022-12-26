import { authAPI } from "../api/Api";
import { authThunkCreator, setAuthUserDataCreator } from "./authReducer";

const SET_INITIALIZED = 'SET-INITIALIZED';


const initialState = {
    initializedSuccess: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initializedSuccess: true,
            }

        default:
            return state;
    }
}

export const setInitializedCreator = () => ({type: SET_INITIALIZED})


export const initializedThunkCreator = () => {

    return (dispatch) => {
        const promise = dispatch(authThunkCreator())
        promise.then(() => {
            dispatch(setInitializedCreator())
        })
    }
}

export default appReducer;
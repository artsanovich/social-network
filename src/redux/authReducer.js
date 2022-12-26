import { authAPI } from "../api/Api";

const SET_USER_DATA = 'auth/SET-USER-DATA';


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const setAuthUserDataCreator = (userId, email, login, isAuth) => 
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}})


export const authThunkCreator = () => {

    return async (dispatch) => {
        const resp = await authAPI.auth()
        if(resp.data.resultCode === 0) {
            const {id, email, login} = resp.data.data
            dispatch(setAuthUserDataCreator(id, email, login, true))
        }
    }
}

export const loginThunkCreator = (email, password, rememberMe, setStatus) => {
    return async (dispatch) => {
      const resp = await authAPI.login(email, password, rememberMe)
        if (resp.data.resultCode === 0) {
          dispatch(authThunkCreator())
        } else { setStatus(resp.data.messages) };
    }
  };

export const logoutThunkCreator = () => {

    return async (dispatch) => {
       const resp = await authAPI.logout()
            if(resp.data.resultCode === 0) {
                dispatch(setAuthUserDataCreator(null, null, null, false))
            }
    }
}

export default authReducer;
import { ResultCodeEnum, ResultCodeForCaptchaEnum, } from "../api/Api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { securityAPI } from "../api/security-api";
import { authAPI } from "../api/auth-api";

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const actions = {
    setAuthUserDataCreator: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => 
        ({type: 'auth/SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccessCreator: (captchaUrl: string) => 
        ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)

}


export const authThunkCreator = (): ThunkType => {

    return async (dispatch) => {
        const authData = await authAPI.auth()
        if(authData.resultCode === ResultCodeEnum.Success) {
            const {id, email, login} = authData.data
            dispatch(actions.setAuthUserDataCreator(id, email, login, true))
        }
    }
}

export const loginThunkCreator = 
    (email: string, password: string, rememberMe: boolean, captcha: any, setStatus: Function): ThunkType => {
        return async (dispatch) => {
        const loginData = await authAPI.login(email, password, rememberMe, captcha)
            if (loginData.resultCode === 0) {
            dispatch(authThunkCreator())
            } else { 
                if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                    dispatch(getCaptchaUrlThunkCreator())
                }
                setStatus(loginData.messages) 
            };
        }
};

export const getCaptchaUrlThunkCreator = (): ThunkType => {
    return async (dispatch) => {
      const data = await securityAPI.getCaptchaUrl()
      const captchaUrl = data.url

      dispatch(actions.getCaptchaUrlSuccessCreator(captchaUrl))
    }
};

export const logoutThunkCreator = (): ThunkType => {

    return async (dispatch) => {
       const resp = await authAPI.logout()
            if(resp.data.resultCode === 0) {
                dispatch(actions.setAuthUserDataCreator(null, null, null, false))
            }
    }
}

export default authReducer;
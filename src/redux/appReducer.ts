import { Dispatch } from "react";
import { authThunkCreator } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";
import { ThunkAction } from 'redux-thunk';

export type InitialStateType = typeof initialState

const initialState = {
    initializedSuccess: false
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    setInitializedCreator: () => ({type: 'auth/SET_INITIALIZED'} as const)
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'auth/SET_INITIALIZED':
            return {
                ...state,
                initializedSuccess: true,
            }

        default:
            return state;
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> 

export const initializedThunkCreator = (): ThunkType => {

    return async (dispatch) => {
        const promise = dispatch(authThunkCreator())
        promise.then(() => {
            dispatch(actions.setInitializedCreator())
        })
    }
}

export default appReducer;
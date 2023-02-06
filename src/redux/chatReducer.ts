import { Dispatch } from "react";
import { authThunkCreator } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";
import { ThunkAction } from 'redux-thunk';
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api";
import {v1} from 'uuid';

export type InitialStateType = typeof initialState

const initialState = {
    messages: [] as ChatMessageAPIType[],
    status: 'pending' as StatusType
}

type ActionsType = InferActionsTypes<typeof actions>


export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => 
        ({type: 'chat/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => 
        ({type: 'chat/STATUS_CHANGED', payload: {status}} as const),
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id:v1()}))]
                    .filter((m, idx, arr) => idx >= arr.length - 100)
            }
        case 'chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state;
    }
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> 

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    } 
    
    return _newMessageHandler   
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    } 
    
    return _statusChangedHandler   
}

export const startMessagesListeningThunkCreator = (): ThunkType => {

    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}

export const stopMessagesListeningThunkCreator = (): ThunkType => {

    return async (dispatch) => {
        chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
        chatAPI.stop()
    }
}

export const sendMessageThunkCreator = (message: string): ThunkType => {

    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}

export default chatReducer;
import { InferActionsTypes } from "./reduxStore"

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

const initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'Hey'},
        {id: 4, message: 'Hello'},
        {id: 5, message: 'Hola'},
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Artur'},
        {id: 2, name: 'Annie'},
        {id: 3, name: 'Veronica'},
        {id: 4, name: 'Max'},
        {id: 5, name: 'Dima'},
        {id: 6, name: 'Sasha'},
    ] as Array<DialogType>
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({
        type: 'dialogs/SEND_MESSAGE',
        newMessageBody
    } as const)
}


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {

        case 'dialogs/SEND_MESSAGE':
            const body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }

        default:
            return state;
    }
}

export default dialogsReducer;
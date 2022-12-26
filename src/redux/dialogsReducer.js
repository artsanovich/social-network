const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'Chinazes'},
        {id: 4, message: 'Sanchizes'},
        {id: 5, message: 'xd'},
    ],
    dialogs: [
        {id: 1, name: 'Artur'},
        {id: 2, name: 'Annie'},
        {id: 3, name: 'Veronica'},
        {id: 4, name: 'Max'},
        {id: 5, name: 'Dima'},
        {id: 6, name: 'Sasha'},
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch(action.type) {

        case SEND_MESSAGE:
            const body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }

        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({
    type: SEND_MESSAGE,
    newMessageBody
})



export default dialogsReducer;
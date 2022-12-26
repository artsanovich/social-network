import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";


const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hey', likesCount: 12},
                {id: 2, message: 'How are you?', likesCount: 15},
                {id: 3, message: 'Nice to meet you', likesCount: 22},
                {id: 4, message: 'Whats new today?', likesCount: 9},
            ],
            newPostText: 'heyooooooooo'
        },
        dialogsPage: {
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
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('state changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;
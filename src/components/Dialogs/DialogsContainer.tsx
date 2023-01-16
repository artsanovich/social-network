import React from "react";
import Dialogs from "./Dialogs";
import {connect, ConnectedProps} from 'react-redux'
import { actions } from "../../redux/dialogsReducer";
import { Navigate } from "react-router-dom";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";
import { AppDispatch, AppStateType } from "../../redux/reduxStore";



const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(actions.sendMessageCreator(newMessageBody))
        }
    }
}

export type DialogsPropsFromConnect = ConnectedProps<typeof DialogsConnector>

const DialogsConnector = connect(mapStateToProps, mapDispatchToProps)

export default compose<React.ComponentType>(DialogsConnector,WithAuthRedirect)(Dialogs)


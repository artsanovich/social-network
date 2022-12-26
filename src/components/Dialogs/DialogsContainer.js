import React from "react";
import Dialogs from "./Dialogs";
import {connect} from 'react-redux'
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogsReducer";
import { Navigate } from "react-router-dom";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";



const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect)
    (Dialogs)

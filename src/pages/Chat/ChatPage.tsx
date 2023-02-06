import { Avatar, Button, Input } from "antd";
import { FC, UIEvent, useEffect, useRef, useState, memo } from "react";
import { useDispatch } from 'react-redux';
import { sendMessageThunkCreator, startMessagesListeningThunkCreator, stopMessagesListeningThunkCreator } from "../../redux/chatReducer";
import { AppDispatch, AppStateType } from "../../redux/reduxStore";
import { useSelector } from 'react-redux';
import { ChatMessageAPIType } from "../../api/chat-api";
import classes from './ChatPage.module.css'
import TextArea from "antd/es/input/TextArea";

const ChatPage: FC = () => {


    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: FC = () => {

    const dispatch: AppDispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListeningThunkCreator())
        return () => {
            dispatch(stopMessagesListeningThunkCreator())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some error occured. Please refresh page.</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}

const Messages: FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setAutoScroll] = useState(false)

    const scrollHandler = (e: UIEvent) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 1000) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({block: 'end', behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div className={classes.messages} onScroll={scrollHandler}>
          {messages.map((message) => <Message key={message.id} message={message}/>)}
          <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: FC<{message: ChatMessageAPIType}> = memo(({message}) => {

    return (
        <div>
            <Avatar src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
})

const AddMessageForm: FC = () => {

    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch: AppDispatch = useDispatch()

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if(message) {
            dispatch(sendMessageThunkCreator(message))
            setMessage('')
        } else return
    }

    return (
        <div>
        <div><TextArea  onChange={(e) => setMessage(e.currentTarget.value)} value={message} autoSize className={classes.messageInput}></TextArea></div>
        <div><Button type='primary' onClick={sendMessage} disabled={status !== 'ready'}>Send</Button></div>
        </div>
    )
}

export default ChatPage
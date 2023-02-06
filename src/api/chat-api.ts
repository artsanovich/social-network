
export type ChatMessageAPIType = {
    id?: string
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberType = ((messages: ChatMessageAPIType[]) => void) | null
type StatusChangedSubscriberType = ((status: StatusType) => void) 

type EventsNamesType = 'message-received' | 'status-changed'

let ws: WebSocket | null = null;

let subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
} 

const closeHandler = () => {
    notifySubsribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => {
      if(s) {
        s(newMessages)
      }  
    })
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const openHandler = () => {
    notifySubsribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubsribersAboutStatus('error')
    console.log('error - refresh page!')
}

const notifySubsribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubsribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}


export const chatAPI = {
    start() {
        createChannel()
    },

    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },

    subscribe(eventName: EventsNamesType ,callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers.filter(s => s !== callback)
        }
    },

    unsubscribe(eventName: EventsNamesType ,callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers.filter(s => s !== callback)
        }
    },

    sendMessage(message: string) {
        ws?.send(message)
    }
}


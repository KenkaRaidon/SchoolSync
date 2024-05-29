'use client'
import { pusherClient } from '@/lib/pusher'
import { useEffect, useState } from 'react'

const Messages = ({ initialMessages, roomId }) => {
    const [incomingMessages, setIncomingMessages] = useState([])
    useEffect(() => {
        pusherClient.subscribe(roomId)

        const messageHandler = (text) => {
            setIncomingMessages((prev) => [...prev, text])
        };

        pusherClient.bind('incoming-message', messageHandler)

        return () => {
            pusherClient.unbind('incoming-message', messageHandler);
            pusherClient.unsubscribe(roomId);
        }
    }, [])

    return (
        <div>
            {initialMessages.map((message) => (
                <p key={message.id}>{message.text}</p>
            ))}
            {incomingMessages.map((text, i) => (
                <p key={i}>{text}</p>
            ))}
        </div>
    )
}

export default Messages
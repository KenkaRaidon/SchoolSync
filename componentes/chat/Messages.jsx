'use client'
import { pusherClient } from '@/lib/pusher';
import { useEffect, useState } from 'react';

const Messages = ({ initialMessages, roomId }) => {
    const [incomingMessages, setIncomingMessages] = useState([]);

    useEffect(() => {
        pusherClient.subscribe(roomId);

        const messageHandler = (message) => {
            setIncomingMessages((prev) => [...prev, message]);
        };

        pusherClient.bind('incoming-message', messageHandler);

        return () => {
            pusherClient.unbind('incoming-message', messageHandler);
            pusherClient.unsubscribe(roomId);
        };
    }, [roomId]);

    return (
        <div>
            {initialMessages.map((message) => (
                <p key={message.id}><strong>{message.userEmail}</strong>: {message.text}</p>
            ))}
            {incomingMessages.map((message, i) => (
                <p key={`incoming-${i}`}><strong>{message.userEmail}</strong>: {message.text}</p>
            ))}
        </div>
    );
};

export default Messages;
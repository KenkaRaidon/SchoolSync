'use client'

import axios from 'axios'

const MessageField = ({ roomId }) => {
    let input = ''

    const sendMessage = async (text) => {
        await axios.post('/api/message', { text, roomId })
    }

    return (
        <div className='flex gap-2'>
            type a new message:
            <input
                onChange={({ target }) => (input = target.value)}
                className='border border-zinc-300'
                type='text'
            />
            <button onClick={() => sendMessage(input || '')}>send</button>
        </div>
    )
}

export default MessageField
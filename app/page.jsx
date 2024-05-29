'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

const Page = () => {
  const { data: session, status } = useSession();
  let roomIdInput = ''

  useEffect(() => {
    console.log(status)
    if (!["loading", "authenticated"].includes(status)) {
        redirect('/auth/login');
    }
    if (status === "authenticated") {

    }
}, [status]);

  const createRoom = async () => {
    const res = await fetch('/api/rooms/create')
    const roomId = await res.text()
    router.push(`/room/${roomId}`)
  }

  const joinRoom = async (roomId) => {
    router.push(`/room/${roomId}`)
  }

  return (
    <div>
      <button onClick={createRoom}>Create room</button>
      <div className='flex gap-2'>
        <input
          type='text'
          onChange={({ target }) => (roomIdInput = target.value)}
          className='border border-zinc-300'
        />
        <button onClick={() => joinRoom(roomIdInput)}>Join room</button>
      </div>
    </div>
  )
}

export default Page
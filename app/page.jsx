'use client'
import { useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation'
import { LoadingContext } from '@/context/LoadingProvider';

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setIsLoading } = useContext(LoadingContext);
  let roomIdInput = ''
  useEffect(() => {
    setIsLoading(true)
    if (!["loading", "authenticated"].includes(status)) {
      setIsLoading(false)
      redirect('/auth/login');
    }
    if (status === "authenticated") {
      setIsLoading(false)
    }
  }, [status]);

  const createRoom = async () => {
    setIsLoading(true)
    const res = await fetch('/api/rooms/create')
    const roomId = await res.text()
    router.push(`/room/${roomId}`)
    setIsLoading(false)
  }

  const joinRoom = async (roomId) => {
    setIsLoading(true)
    router.push(`/room/${roomId}`)
    setIsLoading(false)
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
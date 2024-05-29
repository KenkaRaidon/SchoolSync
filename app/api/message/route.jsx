import { PrismaClient } from "@prisma/client"
import { pusherServer } from '@/lib/pusher'

const prisma = new PrismaClient();

export async function POST(req) {
  const { text, roomId } = await req.json()

  pusherServer.trigger(roomId, 'incoming-message', text)

  await prisma.message.create({
    data: {
      text,
      chatRoomId: roomId,
    },
  })

  return new Response(JSON.stringify({ success: true }))
}
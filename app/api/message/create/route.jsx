import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { pusherServer } from '@/lib/pusher'; // Asegúrate de que la ruta sea correcta

const prisma = new PrismaClient();

export async function POST(req) {
  const { text, roomId, correo } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: correo,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Crea el mensaje en la base de datos
  const message = await prisma.message.create({
    data: {
      text,
      chatRoomId: roomId,
      userId: user.id,
    },
  });

  // Publica el mensaje a través de Pusher
  pusherServer.trigger(roomId, 'incoming-message', {
    text: message.text,
    userEmail: user.email,
  });

  return new Response(JSON.stringify({ success: true }));
}
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { pusherServer } from '@/lib/pusher'; // Asegúrate de que la ruta sea correcta

const prisma = new PrismaClient();

export async function POST(req) {
  const { title, text, image, correo } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: correo,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Crea el mensaje en la base de datos
  const announcement = await prisma.announcement.create({
    data: {
      title,
      text,
      image,
      userId: user.id,
    },
  });
  console.log(announcement)

  return new Response(JSON.stringify({ success: true }));
}
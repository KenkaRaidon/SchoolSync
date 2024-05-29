import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET() {
  const createdRoom = await prisma.chatRoom.create({
    data: {},
  })

  return new Response(createdRoom.id)
}
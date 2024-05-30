import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const handler = async (req) => {
  try {
    const body = await req.json();
    const { roomName } = body;

    const createdRoom = await prisma.chatRoom.create({
      data: { roomName },
    });

    console.log(createdRoom);

    return NextResponse.json(createdRoom);
  } catch (error) {
    if (error.code === 'P2002' && error.meta && error.meta.target.includes('roomName')) {
      return NextResponse.json({ error: 'Room name already exists' }, { status: 409 });
    }
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export { handler as POST };
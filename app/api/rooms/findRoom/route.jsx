import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const handler = async (req) => {
    const body = await req.json()
    const { roomName } = body;
    console.log(roomName)

    const createdRoom = await prisma.chatRoom.findUnique({
        where: {
            roomName
        }
    })

    console.log(createdRoom)

    return NextResponse.json(createdRoom);
};
export { handler as POST };
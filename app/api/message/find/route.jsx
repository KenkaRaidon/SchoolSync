import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {
    const roomId = req.nextUrl.searchParams.get("roomId")

    const messages = await prisma.message.findMany({
        where: {
            chatRoomId: roomId,
        }, 
        include: {
            user: {
                select: {
                    email: true,
                },
            },
        },
    });

    const serializedMessages = messages.map((message) => ({
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        userId: message.userId,
        chatRoomId: message.chatRoomId,
        userEmail: message.user.email,
    }));

    return NextResponse.json({ data: serializedMessages });

}
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, res) {

    const announcements = await prisma.announcement.findMany({
        include: {
            user: {
                select: {
                    email: true,
                },
            },
        },
    });

    const serializedAnnouncements = announcements.map((announcement) => ({
        id: announcement.id,
        title: announcement.title,
        text: announcement.text,
        image: announcement.image,
        createdAt: announcement.createdAt,
        userId: announcement.userId,
        userEmail: announcement.user.email,
    }));

    return NextResponse.json({ data: serializedAnnouncements });

}
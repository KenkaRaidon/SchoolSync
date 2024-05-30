import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { role } = body;
        console.log(body)

        const createRole = await prisma.role.create({
            data: {
                role
            }
        })
        console.log(createRole)

        return NextResponse.json(createRole);
    } catch (error) {
        if (error.code === 'P2002' && error.meta && error.meta.target.includes('role')) {
            return NextResponse.json({ error: "Role alredy exist" }, { status: 409 });
        }
        console.log("FUCK")
        console.error('Error creating room:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
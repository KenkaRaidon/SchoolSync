import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, roleId } = body;
  console.log(body)
  if (!name || !email || !password || !roleId) {
    return new NextResponse("Missing name, email or password", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (exist) {
    return new NextResponse("Email alredy exist", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword, 
      roleId
    }
  })
  console.log(user)

  return NextResponse.json(user);
}
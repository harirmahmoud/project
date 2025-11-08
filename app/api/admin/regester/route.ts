// app/api/admin/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({ where: { username } });
    if (existingAdmin) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: { username, password: hashedPassword },
    });

    return NextResponse.json({ success: true, admin: newAdmin });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to register admin" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET, { expiresIn: "1h" });

    // Set cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set({
      name: "adminToken",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to login" }, { status: 500 });
  }
}

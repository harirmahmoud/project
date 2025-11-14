import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed

export async function GET() {
  try {
    const notificationCount = await prisma.userNote.count();
    const notification=await prisma.userNote.findMany({
      orderBy:{createdAt:"desc"},
      take:5,
     
    })

    return NextResponse.json({ notificationCount,notification });
  } catch (error) {
    console.error("GET /api/notUSer/get error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    // optional cleanup:
    // await prisma.$disconnect();
  }
}
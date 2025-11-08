import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { message, email } = await req.json()

    if (!message || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        message,
        type:"client buy course",
        email,
      },
    })

    return NextResponse.json({ success: true, notification }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating notification:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

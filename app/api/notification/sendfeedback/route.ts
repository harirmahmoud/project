import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { message,   fullName,title } = await req.json()

    if (!message ||  !fullName||!title) {
      console.log("miissing fields")
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        message,
        description: title,
        fullName,
        type:"suggestion",
        email:"jjj",
        isRead: false,
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

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ notifications })
  } catch (error: any) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

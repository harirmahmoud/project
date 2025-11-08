import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PUT() {
  try {
    // ✅ Update all notifications where isRead = false
    const updated = await prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    })

    return NextResponse.json({
      success: true,
      message: "All notifications marked as read",
      count: updated.count, // number of notifications updated
    })
  } catch (error: any) {
    console.error("Error marking notifications as read:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

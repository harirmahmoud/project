import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ notice params is a Promise
) {
  try {
    const { id } = await context.params // ✅ must await it!

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 })
    }

    const deleted = await prisma.notification.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({
      success: true,
      message: "Notification deleted successfully",
      deleted,
    })
  } catch (error: any) {
    console.error("Error deleting notification:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

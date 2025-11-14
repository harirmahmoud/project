import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ notice params is a Promise
) {
  try {
    const { id } = await context.params // ✅ must await it!

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 })
    }

    const deleted = await prisma.service.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
      deleted,
    })
  } catch (error: any) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params  // ✅ await the params
    const courseId = parseInt(id, 10)

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { Users: true }, // make sure this relation exists
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ users: course.Users })
  } catch (error) {
    console.error("Error fetching course users:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

import prisma from "@/lib/prisma"

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    // Ensure `id` is a number if your Prisma model uses Int
    const deletedCourse = await prisma.course.delete({
      where: { id: Number(id) },
    })

    return Response.json({ success: true, data: deletedCourse })
  } catch (error) {
    console.error("Error deleting course:", error)
    return Response.json(
      { success: false, message: "Failed to delete course" },
      { status: 500 }
    )
  }
}

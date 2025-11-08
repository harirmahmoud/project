import prisma from "@/lib/prisma"

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    // Ensure `id` is a number if your Prisma model uses Int
    const deletedBlog = await prisma.blog.delete({
      where: { id: Number(id) },
    })

    return Response.json({ success: true, data: deletedBlog })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return Response.json(
      { success: false, message: "Failed to delete blog" },
      { status: 500 }
    )
  }
}

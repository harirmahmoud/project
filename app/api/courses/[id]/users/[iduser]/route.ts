import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string; iduser: string }> }
) {
  try {
    // ✅ Unwrap params (new Next.js 15 requirement)
    const { id, iduser } = await context.params;

    const courseId = parseInt(id, 10);
    const userId = parseInt(iduser, 10);

    // ✅ Make sure relation name matches your Prisma schema
    await prisma.course.update({
      where: { id: courseId },
      data: {
        Users: {
          disconnect: { id: userId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting user from course:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}

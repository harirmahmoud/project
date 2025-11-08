import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { id, title, content, author, category, description, status, image } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Missing blog ID" }, { status: 400 });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        author,
        category,
        description,
        status,
        image,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("[v0] Error updating blog:", error);
    return NextResponse.json({ message: "Failed to update blog" }, { status: 500 });
  }
}

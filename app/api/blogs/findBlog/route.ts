import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    console.log("[v0] Missing blog ID in request");
    return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
  }

  try {
    const blog   = await prisma.blog.findUnique({
        select: {
          id: true,
          title: true,
          description: true,
          content: true,
          author: true,
          category: true,
          status: true,
          image: true,
      },
      where: { id: Number(id) },
    });

    if (!blog) {
        console.log(`[v0] Blog with ID ${id} not found`);
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("[v0] Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    console.log("[v0] Missing course ID in request");
    return NextResponse.json({ error: "Missing course ID" }, { status: 400 });
  }

  try {
    const course = await prisma.course.findUnique({
        select:{
            id: true,
            title: true,
            description: true,
            duration: true,
            instructor: true,
            level: true,
            price: true,
            photo: true,
        },
      where: { id: Number(id) },
    });

    if (!course) {
        console.log(`[v0] Course with ID ${id} not found`);
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("[v0] Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

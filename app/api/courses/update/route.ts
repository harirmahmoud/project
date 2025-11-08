import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { id, title, description, instructor, photo, price, duration, level } = await req.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Ensure numeric type for ID and price
    const updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        instructor: instructor || null,
        photo: photo || "",
        price: parseFloat(price),
        duration: duration || "",
        level,
      },
    });

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error: any) {
    console.error("Error updating course:", error);

    // Handle Prisma "record not found"
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

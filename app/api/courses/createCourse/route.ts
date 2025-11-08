import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: { json: () => PromiseLike<{ title: any; description: any; instructor: any; photo: any; price: any; link: any; duration: any; level: any; }> | { title: any; description: any; instructor: any; photo: any; price: any; link: any; duration: any; level: any; }; }) {
  try {
    const {
      title,
      description,
      instructor,
      photo,
      price,
      link,
      duration,
      level,
    } = await req.json();

    // ✅ Validate required fields
    if (!title || !description  || !level || !link || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Ensure types match Prisma schema
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice)) {
      return NextResponse.json({ error: "Price must be a number" }, { status: 400 });
    }

    // ✅ Create the course
    const newCourse = await prisma.course.create({
      data: {
        title: String(title),
        description: String(description),
        instructor: instructor ? String(instructor) : null,
        photo: photo ? String(photo) : "",
        price: parsedPrice,
        link: String(link),
        duration: String(duration),
        level: String(level),
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

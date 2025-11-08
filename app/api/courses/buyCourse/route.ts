import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, courseId } = await req.json();

    if (!email || !courseId) {
      console.log("❌ Missing email or courseId");
      return NextResponse.json(
        { success: false, message: "Email and Course ID are required." },
        { status: 400 }
      );
    }

    // ✅ Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: Number(courseId) },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found." },
        { status: 404 }
      );
    }
   
    const courseid = Number(courseId);
    console.log("✅ Processing purchase:", { email, courseid });
    // ✅ Check if user already enrolled (fixed)
    const alreadyBought = await prisma.course.findFirst({
      where: {
        Users: {
          some: {
            email: email,
          },
        },
      },
      select: { id: true },
    });

    if (alreadyBought) {
      return NextResponse.json({
        success: false,
        message: "User already enrolled in this course.",
      });
    }

    // ✅ Link user to course
    await prisma.course.update({
      where: { id: Number(courseId) },
      data: {
        Users: {
          connect: { email: email },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Enrolled successfully.",
      courseTitle: course.title,
    });
  } catch (error: any) {
    console.error("❌ Error in /api/courses/buy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to buy course" },
      { status: 500 }
    );
  }
}

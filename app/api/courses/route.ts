import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { id: userId } = await req.json();
    const { searchParams } = new URL(req.url)
    const search = decodeURIComponent(searchParams.get("search") || "").trim()
    const level = decodeURIComponent(searchParams.get("level") || "").trim()
    const page = Number(searchParams.get("page") || 1)
    const limit = Number(searchParams.get("limit") || 6)

    const skip = (page - 1) * limit

    const where: any = {}

    // ✅ Add search safely
    if (search && search !== "undefined" && search.length > 0) {
  where.OR = [
    { title: { contains: search } },
    { description: { contains: search } },
    { instructor: { contains: search } },
  ]
}

    if (search === "undefined") {
      console.log("Search is undefined")
    }

    // ✅ Add level filter (ignore “الكل”)
    if (level && level !== "الكل" && level !== "undefined") {
      where.level = level
    }

    // Count total results
    const total = await prisma.course.count({ where })

    // Fetch paginated results
    const courses = await prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "desc" },
       include: {
        _count: {
          select: { Users: true }, // counts how many users are enrolled
        },
        Tags: { select: { name: true } },
      },
    })
    const isBuyedCoursesIdsRaw  = await prisma.course.findMany({
      where: {
        Users: { some: { id: userId } },
      },
      select: {
        id: true,
      },
    })
    const isBuyedCoursesIds = isBuyedCoursesIdsRaw.map((course) => course.id);
    console.log("✅ User bought courses IDs:", isBuyedCoursesIds)
    const totalPages = Math.ceil(total / limit)
    const formattedCourses = courses.map((course) => ({
      ...course,
      countUsers: course._count.Users,
      tags: course.Tags.map((tag) => tag.name),
    }));

    return NextResponse.json({
      success: true,
      courses:formattedCourses,
      total,
      page,
      totalPages,
      isBuyedCoursesIds,
    })
  } catch (error: any) {
    console.error("❌ Error in /api/courses:", error.message)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "6")

    const skip = (page - 1) * limit

    // Prisma query filters
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, } },
        { description: { contains: search,  } },
        { author: { contains: search, } },
      ]
    }

    if (category && category !== "الكل") {
      where.category = category
    }

    // Count total blogs
    const total = await prisma.blog.count({ where })

    // Fetch paginated blogs
    const blogs = await prisma.blog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "desc" },
    })

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      blogs,
      total,
      page,
      totalPages,
    })
  } catch (error) {
    console.error("[GET /api/blogs] Error fetching blogs:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma" // adjust path if needed

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    // If ID exists, fetch a single blog
    if (id) {
      const blog = await prisma.blog.findUnique({
        where: { id: Number(id) },
      })

      if (!blog) {
        return NextResponse.json({ blog: null, error: "Blog not found" }, { status: 404 })
      }

      return NextResponse.json({ blog }, { status: 200 })
    }

    // If no ID, return all blogs (optional)
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ blogs }, { status: 200 })
  } catch (error) {
    console.error("❌ Error fetching blog(s):", error)
    return NextResponse.json({ error: "Failed to fetch blog(s)" }, { status: 500 })
  }
}

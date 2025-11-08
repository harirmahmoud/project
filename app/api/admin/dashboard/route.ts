import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed

export async function GET() {
  try {
    // 1️⃣ Count totals
    const totalCourses = await prisma.course.count();
    const totalStudents = await prisma.user.count();
    const totalBlogs = await prisma.blog.count();

    // 2️⃣ Fetch courses with enrolled users to calculate revenue
    const coursesWithUsers = await prisma.course.findMany({
      include: { Users: true },
    });

    const unreadCount = await prisma.notification.count({
      where: { isRead: false },
    })

    const totalRevenue = coursesWithUsers.reduce((acc: number, course: { price: number; Users: string | any[]; }) => {
      return acc + course.price * course.Users.length;
    }, 0);

    // 3️⃣ Fetch recent courses and blogs for dashboard display
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { Users: true },
    });

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { Users: true },
    });

    const unnotification=await prisma.notification.findMany({
      orderBy:{createdAt:"desc"},
      
      where:{isRead:false},
    })
    const notification=await prisma.notification.findMany({
      orderBy:{createdAt:"desc"},
      take:5,
     
    })

    return NextResponse.json({
      totalCourses,
      totalStudents,
      totalRevenue,
      totalBlogs,
      courses,
      blogs,
      unreadCount,
      notification,
      unnotification,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

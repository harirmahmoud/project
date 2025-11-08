import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // to hash the new password

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // ✅ Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "اسم المستخدم وكلمة المرور مطلوبان." },
        { status: 400 }
      );
    }

    // ✅ Hash new password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Update the admin (assuming single admin record)
    const updatedAdmin = await prisma.admin.updateMany({
      data: {
        username,
        password: hashedPassword,
      },
    });

    if (updatedAdmin.count === 0) {
      return NextResponse.json(
        { success: false, message: "لم يتم العثور على حساب المدير لتحديثه." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث معلومات المدير بنجاح.",
    });
  } catch (error: any) {
    console.error("❌ Error updating admin:", error);
    return NextResponse.json(
      { success: false, message: "فشل في تحديث بيانات المدير." },
      { status: 500 }
    );
  }
}

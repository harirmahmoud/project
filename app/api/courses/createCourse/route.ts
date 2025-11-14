import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: { json: () => PromiseLike<{ startedAt:any;title: any; description: any; instructor: any; photo: any; price: any; link: any; duration: any; level: any; maxUsers: any; tags: any[] }> | {startedAt:any; title: any; description: any; instructor: any; photo: any; price: any; link: any; duration: any; level: any; maxUsers: any; tags: any[] }; }) {
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
      maxUsers,
      tags,
      startedAt
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
    tags.forEach(async tag => {
      if (typeof tag !== 'string') {
        throw new Error('Each tag must be a string');
      }else{
        try{
          await prisma.tag.create({
            data: {
              name: tag
            }
          }); 
       }catch(err){}
      }
    });
    

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
        maxUsers: ( maxUsers !== undefined && maxUsers !== null) ? Number(maxUsers) : 0,
        startedAt: new Date(startedAt),
        Tags: { // <-- use the exact relation field name
      connectOrCreate: tags.map((tagName) => ({
        where: { name: tagName },
        create: { name: tagName },
      })),
    },
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

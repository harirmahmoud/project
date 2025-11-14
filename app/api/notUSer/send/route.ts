import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    try{
        const {type,note}=await req.json()
    if(!type||!note){
        return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
      const notification = await prisma.userNote.create({
      data: {
        note,
        type,
       
      },
    })

    return NextResponse.json({ success: true, notification }, { status: 201 })
    }
    catch (error: any) {
    console.error("Error creating notification:", error)
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }


}
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try{
        const services=await prisma.service.findMany({
            orderBy: { createdAt: "desc" },
            take:10
        })
        return NextResponse.json({ services })
    }
    catch (error: any) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
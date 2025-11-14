import prisma from '@/lib/prisma'



export async function POST(req: Request) {
  try {
    const {fullName,email,phone,company,type,level,description}=await req.json()
    const service = await prisma.service.create({
      data: {
       
        fullName,
        email,
        phone,
        company,
        type,
        level,
        description
      }
    })
    return new Response(JSON.stringify(service), { status: 201 })
  }catch(e){
    console.error(e)
    return new Response("Error creating service", { status: 500 })
  }
}
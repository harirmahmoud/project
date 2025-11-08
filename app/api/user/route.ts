import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const {  email } = await req.json()
    const users = await prisma.user.findMany({
        where: {
            email: email
        },
        select:{
            id:true,
        }
    })
    return Response.json(users)
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}


import prisma from '@/lib/prisma'



export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json()
    const newUser = await prisma.user.create({
      data: { email, firstName, lastName },
    })
    return Response.json(newUser)
  } catch (error) {
    console.error(error)
    return new Response('Failed to create user', { status: 500 })
  }
}

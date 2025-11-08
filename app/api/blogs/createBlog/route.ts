import prisma from '@/lib/prisma'



export async function POST(req: Request) {
  try {
    const { title, content, author, category, description, status, image } = await req.json()
    if (!title || !content || !author || !category || !description || !status) {
      console.log('Missing required fields')
      return new Response('Missing required fields', { status: 400 })
    }
  const newBlog = await prisma.blog.create({
  data: {
    title,
    content,
    author,
    category,
    description,
    status,
    image,
  },
})

    return Response.json(newBlog)
  } catch (error) {
    console.error(error)
    return new Response('Failed to create blog', { status: 500 })
  }
}

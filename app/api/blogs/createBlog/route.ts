import prisma from '@/lib/prisma'



export async function POST(req: Request) {
  try {
    const { title, content, author, category, description, status, image,tags } = await req.json()
    if (!title || !content || !author || !category || !description || !status) {
      console.log('Missing required fields')
      return new Response('Missing required fields', { status: 400 })
    }
    tags.forEach(async (tag: any) => {
      if (typeof tag !== 'string') {
        throw new Error('Each tag must be a string')
      } else {
        try {
          await prisma.tag.create({
            data: {
              name: tag,
            },
          })
        } catch (err) {}
      }
    })
  const newBlog = await prisma.blog.create({
  data: {
    title,
    content,
    author,
    category,
    description,
    
    status,
    image,
     Tags: { // <-- use the exact relation field name
      connectOrCreate: tags.map((tagName: string) => ({
        where: { name: tagName },
        create: { name: tagName },
      })),
    },
  },
})

    return Response.json(newBlog)
  } catch (error) {
    console.error(error)
    return new Response('Failed to create blog', { status: 500 })
  }
}

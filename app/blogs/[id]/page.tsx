"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { Blog } from "@/lib/type"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function BlogDetailPage() {
  const params = useParams()
  const blogId = params.id as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/blogs/blog?id=${blogId}`)
        const data = await response.json()

        if (!data.blog) {
          setError("المقالة غير موجودة")
          return
        }

        setBlog(data.blog)
      } catch (err) {
        console.error("[v0] Error fetching blog:", err)
        setError("حدث خطأ في تحميل المقالة")
      } finally {
        setLoading(false)
      }
    }

    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">جاري التحميل...</p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-lg text-muted-foreground mb-6">{error || "المقالة غير موجودة"}</p>
            <Link href="/blogs">
              <Button variant="outline">العودة إلى المدونة</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Blog Hero */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blogs">
            <Button variant="outline" className="mb-6 text-white border-white hover:bg-white/20 bg-transparent">
              ← العودة إلى المدونة
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {blog.category}
            </Badge>
            <span className="text-primary-foreground/90">
              {new Date(blog.createdAt).toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {blog.author && <span className="text-primary-foreground/90">بقلم: {blog.author}</span>}
          </div>
        </div>
      </section>

      {/* Blog Image */}
      {blog.image && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground">
            <div className="text-lg leading-relaxed whitespace-pre-wrap">{blog.content}</div>
          </div>

          {/* Blog Meta */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الفئة</p>
                <p className="font-semibold text-foreground">{blog.category}</p>
              </div>
              {blog.author && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الكاتب</p>
                  <p className="font-semibold text-foreground">{blog.author}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-1">تاريخ النشر</p>
                <p className="font-semibold text-foreground">{new Date(blog.createdAt).toLocaleDateString("ar-SA")}</p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Link href="/blogs">
              <Button variant="outline" className="gap-2 bg-transparent">
                ← العودة إلى المدونة
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}

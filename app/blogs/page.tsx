"use client"

// ... existing imports ...
import { useState, useEffect } from "react"
import type { Blog, ApiResponse } from "@/lib/type" // Assuming Blog and ApiResponse are defined in a types file
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

// UI components from shadcn/ui
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, Search } from 'lucide-react'
import Link from "next/link"

const categories = ["الكل", "الأمان السيبراني", "الحماية الرقمية", "تكنولوجيا المعلومات"]

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [searchQuery, setSearchQuery] = useState("")
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "6",
        search: searchQuery,
        category: selectedCategory,
      })
      const response = await fetch(`/api/blogs?${params}`)
      const data: ApiResponse<Blog> = await response.json() // ✅ type argument added

      setBlogs(data.blogs || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchBlogs()
}, [currentPage, searchQuery, selectedCategory])


  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* ... existing hero section ... */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">مدونتنا</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            اكتشف أحدث المقالات والأفكار حول الأمن السيبراني والحماية الرقمية
          </p>
        </div>
      </section>

      {/* ... existing search section ... */}
      <section className="py-6 border-b border-border bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن المقالات..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
        </div>
      </section>

      {/* ... existing categories section ... */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">جاري التحميل...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden bg-muted">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground hover:text-primary transition">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.description}</p>
                      <Link href={`/blogs/${post.id}`}>
                      <Button
                        variant="outline"
                        className="w-full text-primary border-primary hover:bg-primary/10 bg-transparent"

                      >
                        اقرأ المزيد →
                      </Button>
                      </Link>
                      
                    </div>
                  </Card>
                ))}
              </div>

              {blogs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    {searchQuery ? "لم نجد مقالات تطابق بحثك" : "لم نجد مقالات في هذه الفئة"}
                  </p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    السابق
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-2"
                  >
                    التالي
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}

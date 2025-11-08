"use client"

// ... existing imports ...
import { useState, useEffect } from "react"
import type { Course, ApiResponse } from "@/lib/type" // Assuming these types are declared somewhere
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"// Assuming these components are declared somewhere
import { Search, ChevronRight, ChevronLeft, Loader2 } from "lucide-react" // Assuming these icons are declared somewhere
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"// Assuming Chatbot component is declared somewhere
import { useUser } from "@clerk/nextjs"
import { toast } from "react-toastify"

const categories = ["الكل", "مبتدئ", "متوسط", "متقدم"] // Assuming categories are defined somewhere

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isBuy, setIsBuy] = useState<number[]>([])
  const [load,setLoad]=useState(false)
  
  const user = useUser()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: "6",
          search: searchQuery,
          level: selectedCategory,
        })
        const response = await fetch(`/api/courses?${params}`, {
          method: "POST",
          body: JSON.stringify({ userId: user.user?.id }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data: ApiResponse<Course> = await response.json()
        setCourses(data.courses || [])
        setTotalPages(data.totalPages || 1)
        setIsBuy(data.isBuyedCoursesIds || [])
        console.log("✅ Fetched courses:", data.isBuyedCoursesIds)
       
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [currentPage, searchQuery, selectedCategory])

  const handleBuy = async (id: number) => {
    setLoad(true);
    // Implement the buy logic here
    const response = await fetch(`/api/courses/buyCourse`, {
      method: "POST",
      body: JSON.stringify({ email: user.user?.emailAddresses[0].emailAddress, courseId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if (data.success) {
      toast.success("تم تسجيلك في الدورة بنجاح!")
      setIsBuy((prev) => [...prev, id])
      const notification = await fetch(`/api/notification`, {
        method: "POST",
        body: JSON.stringify({ email: user.user?.emailAddresses[0].emailAddress, message: `لقد تم تسجيلك في دورة جديدة: ${data.courseTitle}` }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const notificationData = await notification.json()
      if (notificationData.success) {
        toast.success("تم إرسال إشعار التسجيل بنجاح!")
      } else {
        toast.error("فشل إرسال إشعار التسجيل.")
      }
    } else {
      toast.error("فشل تسجيلك في الدورة.")
    }
    setLoad(false);
  }
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* ... existing hero section ... */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">دوراتنا التدريبية</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            تعلم أحدث مهارات الأمن السيبراني من خلال دورات متخصصة وموثوقة
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
              placeholder="ابحث عن الدورات..."
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

      {/* Courses Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">جاري التحميل...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                    <div className="h-48 overflow-hidden bg-muted relative">
                      <img
                        src={course.photo || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary text-primary-foreground">{course.level}</Badge>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-sm text-muted-foreground">{course.duration}</span>
                        <span className="text-sm text-muted-foreground">👨‍🏫 {course.instructor}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground hover:text-primary transition">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">{course.description}</p>
                      <div className="flex items-center justify-between mb-4 pt-4 border-t border-border">
                        <span className="font-bold text-primary">
                          {course.price === 0 ? "مجاني" : `${course.price} DA`}
                        </span>
                      </div>
                      <Button onClick={()=>{isBuy.includes(course.id) ? null : handleBuy(course.id)}} className={isBuy.includes(course.id) ?"w-full bg-primary hover:bg-primary/90 text-primary-foreground":"w-full"} disabled={isBuy.includes(course.id)}>
                        {load ?(
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                        ) : (
                          isBuy.includes(course.id) ? "مسجل بالفعل" : "سجل الآن"
                        )}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {courses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    {searchQuery ? "لم نجد دورات تطابق بحثك" : "لم نجد دورات في هذه الفئة"}
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

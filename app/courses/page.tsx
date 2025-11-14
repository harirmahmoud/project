"use client"

// ... existing imports ...
import { useState, useEffect } from "react"
import type { Course, ApiResponse } from "@/lib/type" // Assuming these types are declared somewhere
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"// Assuming these components are declared somewhere
import { Search, ChevronRight, ChevronLeft, Loader2, Star, User, Tag } from "lucide-react" // Assuming these icons are declared somewhere
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"// Assuming Chatbot component is declared somewhere
import { useUser } from "@clerk/nextjs"
import { toast } from "react-toastify"
import { translations } from "@/lib/translations"
import { Progress } from "@/components/ui/progress"

const categories = ["الكل", "مبتدئ", "متوسط", "متقدم"] // Assuming categories are defined somewhere

export default function CoursesPage() {
        const [language, setLanguage] = useState<string>("ar")
    
      useEffect(() => {
        const savedLang = localStorage.getItem("language") || "ar"
        setLanguage(savedLang)
      }, [])
       const t = translations[language as keyof typeof translations]
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isBuy, setIsBuy] = useState<number[]>([])
  const [load,setLoad]=useState(false)
  const [buy,setBuy]=useState(false)
  
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

  const handleBuy = async (course:any) => {
    if(course.countUsers>=course.maxUsers){
      toast.error("the course is full ")
      return
    }
    setLoad(true);
    // Implement the buy logic here
    const response = await fetch(`/api/courses/buyCourse`, {
      method: "POST",
      body: JSON.stringify({ email: user.user?.emailAddresses[0].emailAddress, courseId: course.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if (data.success) {
      toast.success("تم تسجيلك في الدورة بنجاح!")
      
      setIsBuy((prev) => [...prev, course.id])
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.coursehead}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
           {t.corsemain}
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
              placeholder={t.searchcourse}
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
                {category === "الكل" ? t.all : category==="مبتدئ"? t.beginner:category==="متوسط"? t.middle:t.Expert}
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
              <p className="text-muted-foreground">{t.loading}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 
                {courses.map((course) => (
                   <Card key={course.id} dir="rtl" className="w-full max-w-3xl mx-auto shadow-md rounded-2xl overflow-hidden border">
      <img
        src={course.photo}
        alt="صورة الدورة"
        className="w-full h-48 object-cover"
      />

      <CardContent className="p-4">
        {/* Title & Description */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {course.title}
        </h2>
        <p className="text-gray-600 text-sm mb-3">
          {course.description}
        </p>

        {/* Instructor + Rating */}
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <div className="flex gap-2">
            <User className="h-4 w-4 text-gray-500"/>
            <span>{course.instructor}</span>
          </div>
          
          
          <span className="text-gray-500">{course.maxUsers} / {course.countUsers}</span>
        </div>

        {/* Progress Bar */}
        <Progress value={course.countUsers/course.maxUsers * 100} className="mb-3 h-2 bg-gray-200" />

        {/* Tags */}
        {
          course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.map((tag, index) => (

                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex gap-2"
                >{tag}
                  <Tag className="h-3 w-3 text-green-800"/>
                  
                </span>
              ))}
            </div>
          )
        }
      

        {/* Footer Info */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">
              تاريخ البدء: <span className="font-medium">{new Date(course.startedAt).toLocaleDateString('ar-DZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })}</span>
            </p>
            <p className="text-gray-600 text-sm">
              المدة: <span className="font-medium">{course.duration}</span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-green-700 font-bold text-lg">{course.price} د.ج</p>
            <p className="text-xs text-gray-500">شامل جميع الضرائب</p>
          </div>
        </div>

        {/* Enroll Button */}
        <Button onClick={() => handleBuy(course)} className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white rounded-full text-base py-2">
          {
            load?(
              <Loader2 className="w-4 h-4 text-white animate-spin"/>
            ):
            <span>
               {t.buycourse}
            </span>
          }
        
        </Button>
      </CardContent>
    </Card>
                ))}
              </div>

              {courses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    {t.nocourse}
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
                    {t.next}
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
                    {t.previous}
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

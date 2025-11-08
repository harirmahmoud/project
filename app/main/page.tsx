"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, MessageCircle, BookOpen, Award, Clock } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import prisma from "@/lib/prisma"
import axios from "axios"

// Sample user enrolled courses data
const enrolledCourses = [
  {
    id: 1,
    title: "أساسيات الأمن السيبراني",
    description: "تعلم المبادئ الأساسية للأمن السيبراني",
    image: "/cybersecurity-basics.png",
    progress: 65,
    level: "مبتدئ",
    duration: "4 أسابيع",
    instructor: "أحمد محمود",
  },
  {
    id: 2,
    title: "الحماية من الهجمات السيبرانية المتقدمة",
    description: "تقنيات متقدمة للحماية من التهديدات",
    image: "/network-security-concept.png",
    progress: 40,
    level: "متقدم",
    duration: "6 أسابيع",
    instructor: "فاطمة علي",
  },
  {
    id: 3,
    title: "إدارة كلمات المرور والتشفير",
    description: "تعمق في إدارة الهويات والتشفير",
    image: "/encryption-concept.png",
    progress: 85,
    level: "متوسط",
    duration: "5 أسابيع",
    instructor: "محمد حسن",
  },
]

export default function DashboardPage() {
  const user=useUser()
  console.log({email:user.user?.emailAddresses[0].emailAddress,

  firstName:user.user?.firstName, 
  lastName:user.user?.lastName,
  })
 useEffect(() => {
  const createUser = async () => {
    
    try {
      if (!user.user) return
      const res = await axios.post('/api/createUser', {
        email: user.user?.emailAddresses[0].emailAddress,
        firstName: user.user?.firstName,
        lastName: user.user?.lastName,
      })

      console.log({ res: res.data })
    } catch (error) {
      
    }
  }

  createUser()
}, [user])
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Feedback submitted:", { type: feedbackType, message: feedback })
    setSubmitted(true)
    setFeedback("")
    setTimeout(() => {
      setSubmitted(false)
      setFeedbackOpen(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-balance mb-2">لوحة التحكم</h1>
          <p className="text-white/90">مرحباً بك في لوحة تحكمك الشخصية - تابع تقدمك وإنجازاتك</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الدورات المسجلة</p>
                  <p className="text-3xl font-bold text-primary">3</p>
                </div>
                <BookOpen className="w-10 h-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط التقدم</p>
                  <p className="text-3xl font-bold text-primary">63%</p>
                </div>
                <Award className="w-10 h-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الشهادات المكتسبة</p>
                  <p className="text-3xl font-bold text-primary">1</p>
                </div>
                <Award className="w-10 h-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ساعات التعلم</p>
                  <p className="text-3xl font-bold text-primary">24</p>
                </div>
                <Clock className="w-10 h-10 text-primary/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-balance">الدورات المسجلة</h2>
            <Link href="/courses">
              <Button variant="outline" className="gap-2 bg-transparent">
                عرض جميع الدورات
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition overflow-hidden border-2">
                <div className="relative h-40 bg-muted overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {course.level}
                  </div>
                </div>

                <CardContent className="pt-4">
                  <h3 className="text-lg font-bold mb-2 text-balance">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">التقدم</span>
                      <span className="text-xs font-bold text-primary">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">متابعة الدراسة</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <Card className="border-2 border-primary/20 bg-primary/5 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              رأيك يهمنا
            </CardTitle>
            <CardDescription>شارك اقتراحاتك وملاحظاتك لمساعدتنا في تحسين المنصة</CardDescription>
          </CardHeader>

          <CardContent>
            {!feedbackOpen ? (
              <Button onClick={() => setFeedbackOpen(true)} className="bg-primary hover:bg-primary/90">
                <MessageCircle className="w-4 h-4 mr-2" />
                إرسال ملاحظة أو اقتراح
              </Button>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">نوع الملاحظة</label>
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="suggestion">اقتراح</option>
                    <option value="bug">مشكلة تقنية</option>
                    <option value="improvement">تحسين</option>
                    <option value="feedback">ملاحظة عامة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">رسالتك</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="شارك معنا ملاحظاتك وآراؤك..."
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={!feedback.trim()}>
                    {submitted ? "تم الإرسال بنجاح!" : "إرسال"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFeedbackOpen(false)
                      setFeedback("")
                    }}
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

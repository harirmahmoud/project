"use client"

import { useEffect, useState } from "react"
import {  toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Edit2,
  Trash2,
  DollarSign,
  TrendingUp,
  Users,
  BookOpen,
  Bell,
  Trash,
  X,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { MdDescription } from "react-icons/md"


export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [load,setLoad]=useState(false)
    const [editingCourse, setEditingCourse] = useState(null as any)
  const [editingBlog, setEditingBlog] = useState(null as any)
  const [error, setError] = useState<string | null>(null)
  const [totalCourses, setTotalCourses] = useState(0)
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalBlogs, setTotalBlogs] = useState(0)
  const [courses, setCourses] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [coursePage, setCoursePage] = useState(1)
  const [blogPage, setBlogPage] = useState(1)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    level: "مبتدئ",
    price: 0,
    
    instructor: "",
    duration: "",
    photo: "",
    link: "",
    description: "",
  })
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    category: "التدريب",
    status: "مسودة",
    image: "",
    content:"",
    author:""
  })
  const [notifications, setNotifications] = useState<any[]>([])
  const [unnotifications, setUnnotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [contNotifications, setContNotifications] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard data
        const res = await fetch('/api/admin/dashboard')
        const data = await res.json()
        if (res.ok) {
          setTotalCourses(data.totalCourses)
          setTotalStudents(data.totalStudents)
          setTotalRevenue(data.totalRevenue)
          setTotalBlogs(data.totalBlogs)
          setCourses(data.courses)
          setBlogs(data.blogs)
          setNotifications(data.notification)
          setUnnotifications(data.unnotification)
          setContNotifications(data.countNotification)

        } else {
          setError(data.message)
          toast.error(data.message)
        }
      } catch (error) {
        console.error(error)
        setError('Internal Server Error')
        toast.error("error in server !")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const coursesPerPage = 4
  const blogsPerPage = 4

  const totalCoursePages = Math.ceil(courses.length / coursesPerPage)
  const totalBlogPages = Math.ceil(blogs.length / blogsPerPage)

  const paginatedCourses = courses.slice(
    (coursePage - 1) * coursesPerPage,
    coursePage * coursesPerPage
  )
  const paginatedBlogs = blogs.slice(
    (blogPage - 1) * blogsPerPage,
    blogPage * blogsPerPage
  )
  const handleImageUpload = (file: Blob | undefined, type: string) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === "string" && result) {
        if (type === "course") {
          setNewCourse({ ...newCourse, photo: result })
        } else {
          setNewBlog({ ...newBlog, image: result })
        }
      }
    }
    if (file) reader.readAsDataURL(file)
  }
  const handleAddCourse = async() => {
    // Add course logic here
    setLoad(true)
    try{
      
      console.log("Adding course:", newCourse)
      const res = await fetch('/api/courses/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      })
      if (res.ok) {
        const data = await res.json()
        setCourses([...courses, data])
        setNewCourse({
          title: "",
          level: "مبتدئ",
          price: 0,
          
          instructor: "",
          duration: "",
          photo: "",
          link:"",
          description:""
        })
          toast.success("تمت إضافة الدورة بنجاح")
      } else {
        const error = await res.json()
        setError(error.message)
        console.log(error)
        toast.error("حدث مشكل")
      }
    } catch (error) {
      console.error(error)
      setError('Internal Server Error')
      toast.error("حدث مشكل")
    }
    setLoad(false)
  }
  const handleAddBlog = async() => {
    // Add blog logic here
    setLoad(true)
    try {
      const res = await fetch('/api/blogs/createBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      })
      if (res.ok) {
        const data = await res.json()
        setBlogs([...blogs, data])
        setNewBlog({
          title: "",
          description: "",
          category: "التدريب",
          status: "مسودة",
          image: "",
          author:"",
          content:"",
        })
        toast.success("تمت إضافة المدونة بنجاح")
      } else {
        const error = await res.json()
        setError(error.message)
        console.log(error)
        toast.error("حدث مشكل")
      }
    } catch (error) {
      console.error(error)
      setError('Internal Server Error')
      toast.error("حدث مشكل")
    }
    setLoad(false)
  }
  const handleDeleteCourse = async(id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الدورة؟")) return
    setLoad(true)
    try{
      const res = await fetch(`/api/courses/deleteCourse`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setCourses(courses.filter((course) => course.id !== id))
        toast.success("تم حذف الدورة بنجاح")
      } else {
        const error = await res.json()
        setError(error.message)
        toast.error("حدث مشكل")
      }
    } catch (error) {
      console.error(error)
      setError('Internal Server Error')
      toast.error("حدث مشكل")
    }
    setLoad(false)
  }
  const handleDeleteBlog = async(id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه المدونة؟")) return
    // Delete blog logic here
    setLoad(true)
    try{
      const res = await fetch(`/api/blogs/deleteBlog`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== id))
        toast.success("تم حذف المدونة بنجاح")
      } else {
        const error = await res.json()
        setError(error.message)
        console.log(error)
        toast.error("حدث مشكل")
      }
    } catch (error) {
      console.error(error)
      setError('Internal Server Error')
      toast.error("حدث مشكل")
    }
    setLoad(false)
  }
 const handleUpdateBlog = async (id:number) => {
  setLoad(true)
    if (editingBlog && editingBlog.title && editingBlog.description) {
      try {
        const res = await fetch("/api/blogs/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingBlog.id,
            title: editingBlog.title,
            description: editingBlog.description,
            category: editingBlog.category,
            image: editingBlog.image,
            status: editingBlog.status,
            content: editingBlog.description,
          }),
        })

        if (res.ok) {
          setBlogs(blogs.map((b) => (b.id === editingBlog.id ? editingBlog : b)))
          setEditingBlog({
            id:0,
    title: "",
    description: "",
    category: "التدريب",
    status: "مسودة",
    image: "",
    content:"",
    author:""
          })
          setShowBlogForm(false)
          toast.success("تم تحديث المدونة بنجاح")
        }
      } catch (err) {
        console.error("[v0] Error updating blog:", err)
        toast.error("حدث مشكل")
      }
    }
    setLoad(false)
  }
   const handleUpdateCourse = async (id: number) => {
    setLoad(true)
    if (editingCourse && editingCourse.title && editingCourse.instructor) {
      try {
        const res = await fetch("/api/courses/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingCourse.id,
            title: editingCourse.title,
            description: editingCourse.description,
            instructor: editingCourse.instructor,
            photo: editingCourse.photo,
            price: editingCourse.price,
            duration: editingCourse.duration,
            level: editingCourse.level,
          }),
        })

        if (res.ok) {
          setCourses(
            courses.map((c) => (c.id === editingCourse.id ? { ...editingCourse, photo: editingCourse.photo } : c)),
          )
          setEditingCourse({
             id:0,
      title: "",
    level: "مبتدئ",
    price: 0,
    
    instructor: "",
    duration: "",
    photo: "",
    link: "",
    description: "",
          })
          setShowCourseForm(false)
          toast.success("تم تحديث الدورة بنجاح")
        }
      } catch (err) {
        console.error("[v0] Error updating course:", err)
        toast.error("حدث مشكل")
      }
    }
    setLoad(false)
  }
  const handleUpdateCourse1 = async (id: number) => {
    setLoad(true)
  try {
    const res = await fetch(`/api/courses/findCouse?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      setEditingCourse(data);
      setShowCourseForm(true);
      toast.success("تم جلب بيانات الدورة بنجاح")
    }
  } catch (err) {
    console.error("[v0] Error fetching course:", err);
    toast.error("حدث مشكل")
  }
  setLoad(false)
};
 
 
  const handleDeleteNotification = async (id: number) => {
  if (!confirm("هل أنت متأكد من حذف هذه الملاحظة؟")) return
    setLoad(true)
  try {
    const response = await fetch(`/api/notification/${id}`, { method: "DELETE" })
    const data = await response.json()

    if (response.ok) {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      toast.success("تم حذف الإشعار بنجاح")
    } else {
      console.error("Error deleting notification:", data.error)
      toast.error("حدث مشكل")
    }
  } catch (error) {
    console.error("Error:", error)
    toast.error("حدث مشكل")
  }
  setLoad(false)
}

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">جاري تحميل البيانات...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">لوحة تحكم المسؤول</h1>
            <p className="text-muted-foreground">إدارة الدورات والمدونات والإيرادات</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-card border border-border rounded-lg hover:bg-muted transition"
            >
              <Bell className="w-6 h-6 text-primary" />
              {contNotifications && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-red-900 text-xs rounded-full flex items-center justify-center font-bold">
                  {contNotifications}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-2xl z-50">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h3 className="font-bold text-lg">الإشعارات</h3>
                  <button
                    onClick={async() => {setShowNotifications(false);
                      try{
                        const response = await fetch('/api/notification/markAllRead', {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        });
                        const data = await response.json();
                        if (data.success) {
                          setContNotifications(0);
                          setUnnotifications([]);
                        }
                      } catch (error) {
                        console.error("Error marking notifications as read:", error);
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {unnotifications.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>لا توجد إشعارات جديدة</p>
                    </div>
                  ) : (
                    unnotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-muted transition flex gap-3 ${
                          notification.type === "purchase" ? "bg-green-50" : "bg-blue-50"
                        }`}
                      >
                       
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-muted-foreground hover:text-red-500 transition"
                        >{
                          load?(
                            <Loader2 className="w-4 h-4 animate-spin text-black"/>
                          ):(
                            <Trash className="w-4 h-4" />
                          )
                        }
                          
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الدورات</p>
                <p className="text-3xl font-bold text-foreground">{totalCourses}</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الطلاب</p>
                <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
              </div>
              <Users className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">الإيرادات الكلية</p>
                <p className="text-3xl font-bold text-foreground">{totalRevenue.toLocaleString()} DA</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">المقالات</p>
                <p className="text-3xl font-bold text-foreground">{totalBlogs}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dashboard">إدارة الدورات</TabsTrigger>
            <TabsTrigger value="blogs">إدارة المدونة</TabsTrigger>
            <TabsTrigger value="feedback">الملاحظات</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">الدورات التدريبية</h2>
              <Button
                onClick={() => setShowCourseForm(!showCourseForm)}
                className="bg-primary hover:bg-primary/90 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة دورة جديدة
              </Button>
            </div>

            {showCourseForm && (
              <Card className="p-6 border-primary/20 bg-primary/5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">صورة الدورة</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files?.[0], "course")}
                        className="hidden"
                        id="course-image-input"
                      />
                      <label htmlFor="course-image-input" className="flex flex-col items-center gap-2 cursor-pointer">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">انقر لتحميل صورة الدورة</span>
                      </label>
                      {newCourse.photo || editingCourse?.photo  && (
                        <img
                          src={newCourse.photo || editingCourse?.photo || "/placeholder.svg"}
                          alt="Preview"
                          className="mt-4 h-32 rounded-lg object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">عنوان الدورة</label>
                    <input
                      type="text"
                      value={editingCourse?.title || newCourse.title}
                      onChange={(e) => {
                        if (editingCourse) {
                          setEditingCourse({ ...editingCourse, title: e.target.value })
                        } else {
                          setNewCourse({ ...newCourse, title: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل عنوان الدورة"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الوصف</label>
                    <textarea
                      value={editingCourse?.description || newCourse.description}
                      onChange={(e) => {
                        if (editingCourse) {
                          setEditingCourse({ ...editingCourse, description: e.target.value })
                        } else {
                          setNewCourse({ ...newCourse, description: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل وصف الدورة"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">رابط الدورة</label>
                    <textarea
                      value={editingCourse?.link || newCourse.link}
                      onChange={(e) => {
                        if (editingCourse) {
                          setEditingCourse({ ...editingCourse, link: e.target.value })
                        } else {
                          setNewCourse({ ...newCourse, link: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل وصف الدورة"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">المستوى</label>
                      <select
                        value={editingCourse?.level || newCourse.level}
                        onChange={(e) => {
                          if (editingCourse) {
                            setEditingCourse({ ...editingCourse, level: e.target.value })
                          } else {
                            setNewCourse({ ...newCourse, level: e.target.value })
                          }
                        }}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="مبتدئ">مبتدئ</option>
                        <option value="متوسط">متوسط</option>
                        <option value="متقدم">متقدم</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">السعر (DA)</label>
                      <input
                        type="number"
                        value={editingCourse?.price || newCourse.price}
                        onChange={(e) => {
                          if (editingCourse) {
                            setEditingCourse({ ...editingCourse, price: Number(e.target.value) })
                          } else {
                            setNewCourse({ ...newCourse, price: Number(e.target.value) })
                          }
                        }}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">المدرب</label>
                    <input
                      type="text"
                      value={editingCourse?.instructor || newCourse.instructor}
                      onChange={(e) => {
                        if (editingCourse) {
                          setEditingCourse({ ...editingCourse, instructor: e.target.value })
                        } else {
                          setNewCourse({ ...newCourse, instructor: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل اسم المدرب"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">مدة الدورة</label>
                    <input
                      type="text"
                      value={editingCourse?.duration || newCourse.duration}
                      onChange={(e) => {
                        if (editingCourse) {
                          setEditingCourse({ ...editingCourse, duration: e.target.value })
                        } else {
                          setNewCourse({ ...newCourse, duration: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="مثال: 6 أسابيع"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={editingCourse ? () => handleUpdateCourse(editingCourse.id) : handleAddCourse}
                      className="bg-primary hover:bg-primary/90"
                    >{
                      load?(
                        <Loader2 className="w-4 h-4 animate-spin text-white"/>
                      ):(
                        editingCourse ? "تحديث" : "حفظ"
                      )
                    }</Button>
                    <Button onClick={() => {setShowCourseForm(false);setEditingCourse(null);}} variant="outline">
                      إلغاء
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 overflow-hidden bg-muted">
                    {course.image && (
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg flex-1">{course.title}</h3>
                      <Badge variant="secondary">{course.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">المدرب:</span>
                        <p className="font-medium">{course.instructor}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">المدة:</span>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">السعر:</span>
                        <p className="font-medium text-primary">{course.price} DA</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">الطلاب:</span>
                        <p className="font-medium">{course.students}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent" onClick={()=>handleUpdateCourse1(course.id as number)}>
                        <Edit2 className="w-4 h-4" /> تعديل
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        {
                          load?(
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                          ):(
                            <Trash2 className="w-4 h-4" />
                          )
                        }
                        
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {totalCoursePages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCoursePage(Math.max(1, coursePage - 1))}
                  disabled={coursePage === 1}
                  className="gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalCoursePages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={coursePage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCoursePage(page)}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCoursePage(Math.min(totalCoursePages, coursePage + 1))}
                  disabled={coursePage === totalCoursePages}
                  className="gap-2"
                >
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">المقالات والمدونة</h2>
              <Button
                onClick={() => setShowBlogForm(!showBlogForm)}
                className="bg-primary hover:bg-primary/90 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة مقالة جديدة
              </Button>
            </div>

            {showBlogForm && (
              <Card className="p-6 border-primary/20 bg-primary/5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">صورة المقالة</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files?.[0], "blog")}
                        className="hidden"
                        id="blog-image-input"
                      />
                      <label htmlFor="blog-image-input" className="flex flex-col items-center gap-2 cursor-pointer">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">انقر لتحميل صورة المقالة</span>
                      </label>
                      {( newBlog.image || editingBlog?.image ) && (
                        <img
                          src={newBlog.image || editingBlog?.image || "/placeholder.svg"}
                          alt="Preview"
                          className="mt-4 h-32 rounded-lg object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">عنوان المقالة</label>
                    <input
                      type="text"
                     value={editingBlog?.title || newBlog.title}
                      onChange={(e) => {
                        if (editingBlog) {
                          setEditingBlog({ ...editingBlog, title: e.target.value })
                        } else {
                          setNewBlog({ ...newBlog, title: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل عنوان المقالة"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium mb-2">مؤلف المقالة</label>
                    <input
                      type="text"
                      value={editingBlog?.author || newBlog.author}
                      onChange={(e) => {
                        if (editingBlog) {
                          setEditingBlog({ ...editingBlog, author: e.target.value })
                        } else {
                          setNewBlog({ ...newBlog, author: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل مؤلف المقالة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الوصف</label>
                    <textarea
                      value={editingBlog?.description || newBlog.description}
                      onChange={(e) => {
                        if (editingBlog) {
                          setEditingBlog({ ...editingBlog, description: e.target.value })
                        } else {
                          setNewBlog({ ...newBlog, description: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل وصف المقالة"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">المحتوى</label>
                    <textarea
                      value={editingBlog?.content || newBlog.content}
                      onChange={(e) => {
                        if (editingBlog) {
                          setEditingBlog({ ...editingBlog, content: e.target.value })
                        } else {
                          setNewBlog({ ...newBlog, content: e.target.value })
                        }
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل محتوى المقالة"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الفئة</label>
                      <select
                        value={editingBlog?.category ||newBlog.category}
                         onChange={(e) => {
                        if (editingBlog) {
                          setEditingBlog({ ...editingBlog, category: e.target.value })
                        } else {
                          setNewBlog({ ...newBlog, category: e.target.value })
                        }
                      }}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>التدريب</option>
                        <option>الحماية</option>
                        <option>التوعية</option>
                        <option>التكنولوجيا</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">الحالة</label>
                      <select
                        value={editingBlog?.status || newBlog.status}
                         onChange={(e) => {
                        if (editingBlog) {
                          setEditingBlog({ ...editingBlog, status: e.target.value })
                        } else {
                          setNewBlog({ ...newBlog, status: e.target.value })
                        }
                      }}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="مسودة">مسودة</option>
                        <option value="منشور">منشور</option>
                        <option value="مؤرشف">مؤرشف</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={editingBlog ? () => handleUpdateBlog(editingBlog.id) : handleAddBlog}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {
                        load?(
                          <Loader2 className="w-4 h-4 animate-spin text-black"/>
                        ):(
                          editingBlog ? "تحديث" : "حفظ"
                        )
                      }
                      
                    </Button>
                    <Button onClick={() => {setShowBlogForm(false); setEditingBlog(null);}} variant="outline">
                      إلغاء
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 overflow-hidden bg-muted">
                    {blog.image && (
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg flex-1">{blog.title}</h3>
                      <Badge className={blog.status === "منشور" ? "bg-green-500" : "bg-yellow-500"}>
                        {blog.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{blog.description}</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <Badge variant="secondary">{blog.category}</Badge>
                      <span className="text-muted-foreground">{blog.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent" onClick={()=>handleUpdateBlog(blog.id)}>
                        <Edit2 className="w-4 h-4" /> تعديل
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >{
                        load?(
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                        ):(
                           <Trash2 className="w-4 h-4" />
                        )
                      }
                       
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {totalBlogPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBlogPage(Math.max(1, blogPage - 1))}
                  disabled={blogPage === 1}
                  className="gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalBlogPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={blogPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBlogPage(page)}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBlogPage(Math.min(totalBlogPages, blogPage + 1))}
                  disabled={blogPage === totalBlogPages}
                  className="gap-2"
                >
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <h2 className="text-2xl font-bold">آخر الملاحظات والاقتراحات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notifications.length === 0 ? (
                <p className="text-muted-foreground">لا توجد ملاحظات حالياً</p>
              ) : (
                notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`p-6 border-l-4 ${
                      notification.type === "purchase"
                        ? "border-l-green-500"
                        : notification.type === "feedback"
                          ? "border-l-blue-500"
                          : "border-l-yellow-500"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                     
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                        <div className="flex gap-2">
                          <Badge className={notification.type === "purchase" ? "bg-green-500" : "bg-blue-500"}>
                            {notification.type }
                          </Badge>
                          <span className="text-sm">{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

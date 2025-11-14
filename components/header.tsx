"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MdMenu } from "react-icons/md"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ResponsiveMenu from "./ResponsiveMenue"
import { translations } from "@/lib/translations"
import LanguageSwitcher from "./language-switcher"
import Image from "next/image"
import { Bell, Loader2, Trash, X } from "lucide-react"
import { toast } from "react-toastify"
import { Card, CardContent } from "./ui/card"

export default function Header() {
  const [aiform,setAiform]=useState(false)
  const ainot = [
{
title: "تهديد مباشر او اختراق",
level: "عالي الخطورة",
color: "bg-red-500",
},
{
title: "تحديثات برمجية او تحديات",
level: "متوسط",
color: "bg-orange-500",
},
{
title: "نصائح توعوية",
level: "منخفض",
color: "bg-green-500",
},
{
title: "بلاغات تنظيمية او اعلانات",
level: "عام",
color: "bg-blue-500",
},
];
 type NotificationType = {
    id: string
    note?: string
    type?: string
    createdAt?: any
  }
  const [load,setLoad]=useState(false)
  const [notifications, setNotifications] = useState<NotificationType[]>([])
   const [unnotifications, setUnnotifications] = useState<any[]>([])
   const [contNotifications, setContNotifications] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
    const [language, setLanguage] = useState<string>("ar")
    const [isRead,setIsRead]=useState(true)

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ar"
    setLanguage(savedLang)

    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notUSer/get')
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        const data = await res.json()
        setNotifications(data.notification ?? [])
        console.log(data.notifications)
        setContNotifications(data.notificationCount ?? 0)
      } catch (error) {
        console.error(error)
        
        toast.error("error in server !")
      }
    }

    fetchNotifications()
  }, [])

  const t = translations[language as keyof typeof translations]
   const [open, setOpen] = useState(false)
      const handleToggle = () => {
          setOpen(!open)
      }
      const handleClose = () => {
          setOpen(false)
      }
   
  return (
    <header className="bg-white border-b border-border fixed top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex gap-2">
            <Image width={50} height={50} src={"/logo1.png"} alt={"logo"} />
            <Link href={"#"} className="text-2xl font-bold text-primary ">
            <h1>CyberGuard</h1>
            <h1>Algeria</h1>
             </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition hover:text-primary">
              {t.home}
            </Link>
            <Link href="/blogs" className="text-foreground hover:text-primary transition hover:text-primary">
              {t.blog}
            </Link>

            <Link href="/consulation" className="text-foreground hover:text-primary transition hover:text-primary">
              {t.consultation}
            </Link>
            <Link href="/courses" className="text-foreground hover:text-primary transition hover:text-primary">
              {t.courses}
            </Link>
            <Link href="/suggestions" className="text-foreground hover:text-primary transition hover:text-primary">
              {t.suggestions}
            </Link>
            <Link href="/service-request" className="text-foreground hover:text-primary transition hover:text-primary">
              {t.service}
            </Link>
          </nav>
          <div className="flex gap-3">
            
            <div className={open?'hidden mx-6 cursor-pointer':'lg:hidden mx-6 cursor-pointer'} onClick={()=>{setOpen(!open);console.log(open)}}>
                        <MdMenu className='text-4xl '/>
                    </div>
          {/* CTA Button */}
          <LanguageSwitcher />
          <Link href={"/sign-in"}>
           <Button className="bg-yellow-400 text-black hover:bg-yellow-500">البدء</Button>
          </Link>
         <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-card border border-border rounded-lg hover:bg-muted transition"
            >
              <Bell className="w-6 h-6 text-primary " />
              {
                notifications.length!==0&& isRead&&(
                  <div className="bg-red-500 absolute top-2 right-1 w-3 h-3 rounded-full">
                    
                  </div>
                )
              }
            </button>
            <button
              onClick={() => setAiform(!aiform)}
              className="relative p-3 bg-card border border-border rounded-lg hover:bg-muted transition"
            >
              <Bell className="w-6 h-6 text-primary " />
             
                
                  <div className="bg-red-500 absolute top-2 right-1 w-5 h-5 rounded-full">
                    AI
                  </div>
               
              
            </button>
          </div>

           <ResponsiveMenu open={open as boolean} setOpen={setOpen as Dispatch<SetStateAction<boolean>>}/>
        </div>
       
      </div>
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
                    <X className="w-5 h-5" onClick={()=>{setIsRead(false);setShowNotifications(false)}} />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>لا توجد إشعارات جديدة</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-muted transition flex gap-3 ${
                          notification.type === "purchase" ? "bg-green-50" : "bg-blue-50"
                        }`}
                      >
                       
                        <div className="flex justify-between w-full">
                          <div className="flex-1 ">
                            <h4 className="font-semibold text-sm">{notification.note=="course"?(
                              <span>{t.course}</span>
                            ):(
                              <span>{t.blogs}</span>
                            )}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.type=="course"?(
                              <span>{t.addcourse}</span>
                            ):(
                              <span>{t.addblog}</span>
                            )}</p>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-2">{new Date(notification.createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
     
      year: 'numeric', month: '2-digit',
    })}</p>
                        </div>
                       
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
             {aiform && (
              <Card className="absolute top-14 right-4 w-80 rounded-2xl shadow-xl border p-3 bg-white animate-in fade-in slide-in-from-top-2">
<CardContent className="p-2">
<div className="flex justify-between items-center mb-3">
<span className="text-gray-500 text-sm">4</span>
<span className="font-semibold text-gray-800">AI Notifications</span>
</div>


<div className="space-y-4">
{ainot.map((n, i) => (
<div key={i} className="flex items-center justify-between">
<div>
<p className="font-medium text-gray-800">{n.title}</p>
<p className="text-sm text-gray-500">{n.level}</p>
</div>
<span className={`w-3 h-3 rounded-full ${n.color}`}></span>
</div>
))}
</div>
</CardContent>
</Card>
            )}
    </header>
  )
}

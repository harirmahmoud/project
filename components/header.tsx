"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MdMenu } from "react-icons/md"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ResponsiveMenu from "./ResponsiveMenue"
import { translations } from "@/lib/translations"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
    const [language, setLanguage] = useState<string>("ar")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ar"
    setLanguage(savedLang)
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
          <div className="flex-shrink-0">
            <Link href={"#"} className="text-2xl font-bold text-primary">CyberGuard</Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
            <Link href="/feedback" className="text-foreground hover:text-primary transition hover:text-primary">
              {t.feedback}
            </Link>
            
          </nav>
          <div className="flex gap-3">
            
            <div className={open?'hidden mx-6 cursor-pointer':'md:hidden mx-6 cursor-pointer'} onClick={()=>{setOpen(!open);console.log(open)}}>
                        <MdMenu className='text-4xl '/>
                    </div>
          {/* CTA Button */}
          <LanguageSwitcher />
          <Link href={"/sign-in"}>
           <Button className="bg-yellow-400 text-black hover:bg-yellow-500">البدء</Button>
          </Link>
         
          </div>

           <ResponsiveMenu open={open as boolean} setOpen={setOpen as Dispatch<SetStateAction<boolean>>}/>
        </div>
       
      </div>
      
    </header>
  )
}

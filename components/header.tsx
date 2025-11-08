"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MdMenu } from "react-icons/md"
import { Dispatch, SetStateAction, useState } from "react"
import ResponsiveMenu from "./ResponsiveMenue"

export default function Header() {
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
              الرئيسية
            </Link>
            <Link href="/blogs" className="text-foreground hover:text-primary transition hover:text-primary">
              مقالات
            </Link>

            <Link href="#consultation" className="text-foreground hover:text-primary transition hover:text-primary">
              استشارات
            </Link>
            <Link href="/courses" className="text-foreground hover:text-primary transition hover:text-primary">
              كورسات
            </Link>
            <Link href="#feedback" className="text-foreground hover:text-primary transition hover:text-primary">
              اقتراحات
            </Link>
            
          </nav>
          <div className="flex gap-3">
            
            <div className={open?'hidden mx-6 cursor-pointer':'md:hidden mx-6 cursor-pointer'} onClick={()=>{setOpen(!open);console.log(open)}}>
                        <MdMenu className='text-4xl '/>
                    </div>
          {/* CTA Button */}
          
          </div>

           <ResponsiveMenu open={open as boolean} setOpen={setOpen as Dispatch<SetStateAction<boolean>>}/>
        </div>
       
      </div>
      
    </header>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"#"} className="text-2xl font-bold text-primary">CyberGuard</Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#hero" className="text-foreground hover:text-primary transition hover:text-primary">
              الرئيسية
            </Link>
            <Link href="#missions" className="text-foreground hover:text-primary transition hover:text-primary">
              الخدمات
            </Link>
           
            <Link href="#solution" className="text-foreground hover:text-primary transition hover:text-primary">
              حلولنا
            </Link>
            <Link href="#footer" className="text-foreground hover:text-primary transition hover:text-primary">
              اتصل بنا
            </Link>
          </nav>

          {/* CTA Button */}
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">البدء</Button>
        </div>
      </div>
    </header>
  )
}

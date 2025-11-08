"use client"
import { translations } from "@/lib/translations"
import { useEffect, useState } from "react"

export default function Footer() {
          const [language, setLanguage] = useState<string>("ar")
      
        useEffect(() => {
          const savedLang = localStorage.getItem("language") || "ar"
          setLanguage(savedLang)
        }, [])
         const t = translations[language as keyof typeof translations]
  return (
    <footer className="bg-primary text-primary-foreground py-16 border-t-4 border-yellow-400" id="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">CyberGuardAlgeria</h3>
            <p className="text-sm opacity-90">
              {t.footer1}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t.footer2}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  {t.footer3}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t.footer4}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t.footer5}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t.footer6}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t.footer7}</h4>
            <div className="space-y-2 text-sm">
              <p>{t.footer8}: info@cyberguard.dz</p>
              <p>{t.footer9}: +213 (0) 123 456 789</p>
              <p>{t.footer10}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>{t.footer11}</p>
        </div>
      </div>
    </footer>
  )
}

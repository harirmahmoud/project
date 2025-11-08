"use client"

import { useEffect, useState } from "react"

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<string>("ar")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ar"
    setLanguage(savedLang)
  }, [])

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange("ar")}
        className={`px-3 py-1 rounded font-medium transition ${
          language === "ar" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 rounded font-medium transition ${
          language === "en" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        English
      </button>
    </div>
  )
}

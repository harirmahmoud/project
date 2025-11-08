"use client"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"
import { useEffect, useState } from "react"

export default function Hero() {
      const [language, setLanguage] = useState<string>("ar")
  
    useEffect(() => {
      const savedLang = localStorage.getItem("language") || "ar"
      setLanguage(savedLang)
    }, [])
     const t = translations[language as keyof typeof translations]
  return (
    <section id="hero" className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
      {/* Yellow accent shape */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-bl-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {t.hero1}
          </h1>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 text-balance">
            {t.hero2}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >{t.hero3}
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >{t.hero4}
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              {t.hero5}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

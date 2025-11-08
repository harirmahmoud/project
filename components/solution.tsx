"use client"
import { Card } from "@/components/ui/card"
import { translations } from "@/lib/translations"
import { useEffect, useState } from "react"

export default function Solutions() {
        const [language, setLanguage] = useState<string>("ar")
    
      useEffect(() => {
        const savedLang = localStorage.getItem("language") || "ar"
        setLanguage(savedLang)
      }, [])
       const t = translations[language as keyof typeof translations]
  return (
    <section className="py-20 md:py-32 bg-muted/30" id="solution">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.solution1}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
           {t.solution2}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex p-2 bg-primary text-primary-foreground rounded-lg">🛡️</span>
               {t.solution3}
              </h3>
              <p className="text-muted-foreground">
                {t.solution4}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex p-2 bg-primary text-primary-foreground rounded-lg">🔐</span>
                {t.solution5}
              </h3>
              <p className="text-muted-foreground">
                {t.solution6}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex p-2 bg-primary text-primary-foreground rounded-lg">📊</span>
               {t.solution7}
              </h3>
              <p className="text-muted-foreground">
              {t.solution8}
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-xl">
              <img
                src="/man.jpg"
                alt="Cybersecurity solutions"
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

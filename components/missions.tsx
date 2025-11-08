"use client"
import { Lock, Globe, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { translations } from "@/lib/translations"

export default function Mission() {
        const [language, setLanguage] = useState<string>("ar")
    
      useEffect(() => {
        const savedLang = localStorage.getItem("language") || "ar"
        setLanguage(savedLang)
      }, [])
       const t = translations[language as keyof typeof translations]
  const items = [
    {
      icon: Lock,
      title: t.mission1,
      description: t.mission4,
    },
    {
      icon: Globe,
      title: t.mission2,
      description: t.mission5,
    },
    {
      icon: Settings,
      title: t.mission3,
      description: t.mission6,
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white" id="missions">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.mission7}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.mission8}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="p-8 bg-green-50 border border-muted hover:shadow-lg transition">
                <div className="mb-4 inline-flex p-3 bg-primary text-primary-foreground rounded-lg">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

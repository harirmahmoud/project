"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { translations } from "@/lib/translations"

export default function FeedbackPage() {
            const [language, setLanguage] = useState<string>("ar")
        
          useEffect(() => {
            const savedLang = localStorage.getItem("language") || "ar"
            setLanguage(savedLang)
          }, [])
           const t = translations[language as keyof typeof translations]
  const [formData, setFormData] = useState({
    
    email: "",
    type: "feedback",
    message: "",
    
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/notification/sendfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        toast.error(t.feedback1)
        throw new Error(t.feedback1)
      }
      toast.success(t.feedback2)
      setSubmitted(true)
      setFormData({
       
        email: "",
        type: "feedback",
        message: "",
       
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
        toast.error(t.feedback3)
      setError(err instanceof Error ? err.message : t.feedback3)
    } finally {
        
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background mt-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.feedback4}</h1>
            <p className="text-lg text-muted-foreground">{t.feedback5}</p>
          </div>
        </section>

        {/* Feedback Form */}
        <section className="py-16 bg-background">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 md:p-12 bg-card border border-border shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
               

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.footer8}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.feedback17}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Type and Rating */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.feedback6}</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="feedback">{t.feedback7}</option>
                      <option value="suggestion">{t.feedback9}</option>
                      <option value="bug">{t.feedback10}</option>
                      <option value="feature">{t.feedback11}</option>
                      <option value="complaint">{t.feedback12}</option>
                    </select>
                  </div>

                 
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.feedback13}</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.feedback18}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && <div className="p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

                {/* Success Message */}
                {submitted && (
                  <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                    ✓ {t.feedback14}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? t.feedback16 : t.feedback15}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { translations } from "@/lib/translations"

export default function ConsultationPage() {
             const [language, setLanguage] = useState<string>("ar")
          
            useEffect(() => {
              const savedLang = localStorage.getItem("language") || "ar"
              setLanguage(savedLang)
            }, [])
             const t = translations[language as keyof typeof translations]
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    description: "",
    agreeToTerms: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const consultationSubjects = t.consultationSubjects


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if ( !formData.email || !formData.subject || !formData.description) {
      alert("يرجى ملء جميع الحقول")
      return
    }

    if (!formData.agreeToTerms) {
      alert("يجب الموافقة على الشروط والأحكام")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/notification/sendconsultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          email: formData.email,
          message: formData.subject,
          description: formData.description,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          description: "",
          agreeToTerms: false,
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("Error submitting consultation:", error)
      alert("حدث خطأ في إرسال الطلب")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col mt-10">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{t.suggestion1}</h1>
          <p className="text-lg text-muted-foreground text-balance">
            {t.suggestion2}
          </p>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-card border border-border shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
              {/* Full Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground mb-2">
                   {t.footer8}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.feedback17}
                    className="px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="flex flex-col">
                <label htmlFor="subject" className="text-sm font-semibold text-foreground mb-2">
                 {t.suggestion3}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  required
                >
                  <option value="">{t.suggestion4}</option>
                  {consultationSubjects.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-semibold text-foreground mb-2">
                 {t.suggestion5}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t.suggestion6}
                  rows={6}
                  className="px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded border-input accent-primary cursor-pointer"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                 {t.suggestion7}
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? <span>{t.suggestion13}</span> : <span>{t.suggestion14}</span>}
              </Button>

              {/* Success Message */}
              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-green-700 font-medium">{t.suggestion8}</p>
                  <p className="text-green-600 text-sm mt-1">{t.suggestion9}</p>
                </div>
              )}
            </form>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">{t.suggestion10}</p>
            </Card>
          
            <Card className="p-6 bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-2">{t.suggestion11}</div>
              <p className="text-muted-foreground">{t.suggestion12}</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  )
}

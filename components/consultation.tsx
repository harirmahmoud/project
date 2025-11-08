"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Consultation() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

  try {
    const response = await fetch("/api/notification/sendconsultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         email,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      setSubmitted(true)
      
      setEmail("")
      
      setTimeout(() => setSubmitted(false), 3000)
    } else {
      console.error("Error submitting feedback:", data.error)
    }
  } catch (error) {
    console.error("Error:", error)
  }
   
  }

  return (
    <section id="consultation" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">احصل على استشارة مجانية</h2>
          <p className="text-lg text-muted-foreground">تحدث مع خبرائنا للحصول على حل أمني مخصص لاحتياجات مؤسستك</p>
        </div>

        <Card className="p-8 md:p-12 bg-card border-2 border-primary/20">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {submitted ? "تم الإرسال!" : "اطلب استشارة"}
            </Button>
          </form>

          {submitted && <p className="text-center text-green-600 mt-4">✓ سيتواصل معك فريقنا قريباً</p>}
        </Card>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <p className="text-muted-foreground">دعم فني متواصل</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">عملاء يثقون بنا</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <p className="text-muted-foreground">رضا العملاء</p>
          </div>
        </div>
      </div>
    </section>
  )
}

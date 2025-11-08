"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function FeedbackSection() {
  const [feedback, setFeedback] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("feedback")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!feedback || !email) return

  try {
    const response = await fetch("/api/notification/sendfeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: feedback,
        type,
        email,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      setSubmitted(true)
      setFeedback("")
      setEmail("")
      setType("feedback")
      setTimeout(() => setSubmitted(false), 3000)
    } else {
      console.error("Error submitting feedback:", data.error)
    }
  } catch (error) {
    console.error("Error:", error)
  }
}


  return (
    <section id="feedback" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">شارك معنا رأيك</h2>
          <p className="text-lg text-muted-foreground">مرئياتك وملاحظاتك مهمة لنا لتحسين خدماتنا</p>
        </div>

        <Card className="p-8 md:p-12 bg-card border-2 border-accent/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="feedback">تقييم عام</option>
                <option value="suggestion">اقتراح</option>
                <option value="bug">مشكلة تقنية</option>
                <option value="feature">طلب ميزة</option>
              </select>
            </div>

            <Textarea
              placeholder="شارك آراءك وملاحظاتك معنا..."
              value={feedback}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
              required
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {submitted ? "تم الإرسال!" : "إرسال التقييم"}
              </Button>
            </div>

            {submitted && <p className="text-center text-green-600">✓ شكراً لك على تقييمك، سنراجع ملاحظاتك قريباً</p>}
          </form>
        </Card>
      </div>
    </section>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Lock } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
       
        router.push("/dashboard")
      } else {
        setError(data.message || "اسم المستخدم أو كلمة المرور غير صحيحة")
      }
    } catch (err) {
      console.error("[v0] Login error:", err)
      setError("حدث خطأ أثناء تسجيل الدخول")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white rounded-t-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Lock className="w-8 h-8" />
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          </div>
          <p className="text-primary-foreground/90 text-center">تسجيل دخول المسؤول</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-background"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">كلمة المرور</label>
              <div className="relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-background"
                  placeholder="أدخل كلمة المرور"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-medium text-lg transition"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          
        </div>
      </Card>
    </div>
  )
}

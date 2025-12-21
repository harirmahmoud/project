"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Lock } from "lucide-react"
import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { translations } from "@/lib/translations";

export default function SignInPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<string>("ar")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ar"
    setLanguage(savedLang)
  }, [])
  
  const t = translations[language as keyof typeof translations]
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
  
      // Simulate a login process
      setTimeout(() => {
        setLoading(false)
        router.push("/")
      }, 1000)
    }
  return (
   <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white rounded-t-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Lock className="w-8 h-8" />
            <h1 className="text-3xl font-bold">{t.login} </h1>
          </div>
          <p className="text-primary-foreground/90 text-center">{t.login}  </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">{t.email} </label>
              <input
                type="text"
                
           
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-background"
                placeholder={t.emailInput}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">{t.password} </label>
              <div className="relative ">
                <input
                 
               
                  
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-background"
                  placeholder={t.passwordInput}
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
           

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading }
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-medium text-lg transition"
            >
              {loading ? t.waitlogin : t.login}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          
        </div>
      </Card>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import Header from "@/components/header"
import { translations } from "@/lib/translations"
import { toast } from "react-toastify"

export default function ServiceRequestPage() {
   const [language, setLanguage] = useState<string>("ar")
          
            useEffect(() => {
              const savedLang = localStorage.getItem("language") || "ar"
              setLanguage(savedLang)
            }, [])
            const t = translations[language as keyof typeof translations]
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    serviceType: "",
    priority: "",
    description: "",
  })
  const [loading,setLoading]=useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if(!formData.fullName||!formData.email||!formData.description){
      toast.error("Fill all the fields")
       return
    }
    setLoading(true)

    const response = await fetch('/api/service/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.institution,
        type: formData.serviceType,
        level: formData.priority,
        description: formData.description,
      }),
    })

    if (!response.ok) {
      toast.error("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.")
      return
    }

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      institution: "",
      serviceType: "",
      priority: "",
      description: "",
    })
    setLoading(false)
    toast.success("Send it successfully")
  }

  return (
    <>
    <Header/>
     <div className="flex flex-col items-center justify-center py-10 px-4 mt-15">
      <h1 className="text-3xl font-bold mb-2 text-center">{t.headser}</h1>
      <p className="text-gray-600 mb-8 text-center">
       {t.mainser}
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-md border space-y-6 text-right"
        dir="rtl"
      >
        <h2 className="text-xl font-semibold mb-4">{t.titleser}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{t.fullName}</Label>
            <Input
              placeholder={t.fullNmaeInput}
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div>
            <Label>{t.email}</Label>
            <Input
              type="email"
              placeholder={t.emailInput}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label>{t.phone}*</Label>
            <Input
            type="number"
              placeholder={t.phoneInput}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div>
            <Label>{t.org}*</Label>
            <Input
              placeholder={t.orgInput}
              value={formData.institution}
              onChange={(e) => handleChange("institution", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{t.type}*</Label>
            <Select onValueChange={(v) => handleChange("serviceType", v)}>
              <SelectTrigger>
                <SelectValue placeholder={t.typeInput} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">{t.list1[0]} </SelectItem>
                <SelectItem value="account">{t.list1[1]} </SelectItem>
                <SelectItem value="other">{t.list1[2]} </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t.level}*</Label>
            <Select onValueChange={(v) => handleChange("priority", v)}>
              <SelectTrigger>
                <SelectValue placeholder={t.levelInput} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low"> {t.list2[0]} </SelectItem>
                <SelectItem value="medium">{t.list2[1]}  </SelectItem>
                <SelectItem value="high">{t.list2[2]} </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>{t.desres}</Label>
          <Textarea
            placeholder={t.desInput}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full text-lg py-3">
            {
                loading?(
                    <Loader2 className="w-4 h-4 text-white animate-spin"/>
                ):(
                  <span>
                    {t.sendres}
                  </span>)
            }
          
        </Button>
      </form>
    </div>
    </>
   
  )
}

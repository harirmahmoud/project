// We must mark this as a client component to use interactive components
// like <Select> and <Accordion>
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/header";
import { translations } from "@/lib/translations";

export default function ConsultationPage() {
  const [language, setLanguage] = useState<string>("ar")
      
        useEffect(() => {
          const savedLang = localStorage.getItem("language") || "ar"
          setLanguage(savedLang)
        }, [])
        const t = translations[language as keyof typeof translations]
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    description:"",
    message:""
  })
  const [loading,setLoading]=useState(false)
  const handleChange=(value:string,type:string)=>{
    setFormData({...formData,[type]:value})
  }
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    if(!formData.email|| !formData.description|| !formData.fullName|| !formData.message){
      toast.error("fill all the input !!")
      return
    }
    setLoading(true)
    const res=await fetch("/api/notification/sendconsultation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        description: formData.description,
        message:formData.message,
      })})
      if (!res.ok) {
      toast.error("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.")
      setLoading(false)
      return
    }

    setFormData({
      fullName:"",
    email:"",
    description:"",
    message:""
    })
    setLoading(false)
    toast.success("تم إرسال الطلب بنجاح ✅")
  }
  return (
    <div className="bg-gray-50 min-h-screen ">
      <Header/>
      <main className="max-w-4xl mx-auto space-y-8 mt-20">
        
        {/* === Consultation Form Card === */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-white p-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              {t.conhead}
            </CardTitle>
            <CardDescription className="text-lg pt-2">
              {t.conmain}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-gray-50/50">
            <h2 className="text-2xl font-semibold mb-6">{t.conhead1}</h2>
            <p className="mb-6 text-gray-600">
              {t.conmain1}
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">{t.fullName}</Label>
                  <Input id="fullname" placeholder={t.fullNmaeInput} value={formData.fullName} onChange={(e)=>{handleChange(e.target.value,"fullName")}} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailInput}
                    value={formData.email} onChange={(e)=>{handleChange(e.target.value,"email")}}
                  />
                </div>
              </div>

              {/* Subject Row */}
              <div className="space-y-2">
                <Label htmlFor="subject">{t.subjectcon}</Label>
                <Select onValueChange={(v)=>{handleChange(v,"description")}}>
                  <SelectTrigger id="subject" className="w-full">
                    <SelectValue placeholder={t.chooseSub} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pentesting">اختبار الاختراق</SelectItem>
                    <SelectItem value="compliance">
                      التدقيق والامتثال (ISO 27001)
                    </SelectItem>
                    <SelectItem value="cloud-security">أمن السحابة</SelectItem>
                    <SelectItem value="incident-response">
                      الاستجابة للحوادث
                    </SelectItem>
                    <SelectItem value="other">موضوع آخر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description Row */}
              <div className="space-y-2">
                <Label htmlFor="description">{t.descon}</Label>
                <Textarea
                  id="description"
                  placeholder={t.des}
                  rows={5}
                  value={formData.message} onChange={(e)=>{handleChange(e.target.value,"message")}}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full text-lg">
                {
                  loading?(
                    <Loader2 className="w-4 h-4 text-white animate-spin"/>
                  ):(
                    <>
                   {t.sendcon}
                {/* The icon is placed after the text. In RTL, mr-2 adds margin to the right. */}
                <Send className="mr-2 h-5 w-5" />
                    </>
                  )
                }
                
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* === FAQ Section === */}
        <Card className="p-8 mb-15">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-semibold">
             {t.quest}
            </CardTitle>
            <CardDescription className="pt-2">
              {t.quest1}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base">
                  {t.quest2}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {t.res2}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base">
                  {t.quest3}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                 {t.res3}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-base">
                   {t.quest4}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                 {t.res4}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-base">
                  {t.quest5}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {t.res5}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
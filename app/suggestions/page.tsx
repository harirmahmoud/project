"use client";

import Header from "@/components/header";
import { translations } from "@/lib/translations";
import { Lightbulb, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SuggestionsPage() {
   const [language, setLanguage] = useState<string>("ar")
        
          useEffect(() => {
            const savedLang = localStorage.getItem("language") || "ar"
            setLanguage(savedLang)
          }, [])
          const t = translations[language as keyof typeof translations]
  const [title, setTitle] = useState<string>("");
  const [loading,setLoading]=useState(false)
  const [message, setMessage] = useState("");
  const [form,setForm]=useState({
    title:"",
    message:"",
    email:"hh",
    fullName:"jj",
    type:"ll"
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("/api/notification/sendfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:title,
          message:message,
          fullName:"lll"

        })
      });
      if(!res.ok){
        console.log(res)
        toast.error(`error: ${res}`);
      return
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      toast.error(`error: ${message}`);
      return
    }
    
    setForm({
      title: "",
      message: "",
      email: "hh",
      fullName: "jj",
      type: "ll"
    });
    setLoading(false)
    toast.success(`تم إرسال اقتراحك:\nالعنوان: ${title}`);

  };

  return (
    <>
    <Header/>
    <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 mt-15">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-green-600 text-white p-3 rounded-full">
              <Lightbulb className="h-6 w-6 text-white" />
               
              
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{t.titlesug} </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            {t.mainsug}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             {t.titlesug}<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder={t.inputsug}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             {t.message}<span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-green-500 outline-none"
              placeholder={t.messageIput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Instructions */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
            <h2 className="font-semibold text-green-700 mb-2">{t.sugg}</h2>
            <ul className="list-disc pr-5 space-y-1">
              <li>{t.list[0]}</li>
              <li>{t.list[1]}</li>
              <li>{t.list[2]}</li>
              <li>{t.list[3]}</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all flex justify-center items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 text-white animate-spin" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span>{t.sendsug}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
}

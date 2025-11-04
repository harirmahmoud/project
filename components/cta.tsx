import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-32" id="cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">جاهز لتعزيز أمنك السيبراني؟</h2>

        <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
          انضم إلينا في رحلة تعزيز الأمن السيبراني الوطني والاستثمار في مستقبل آمن رقميًا
        </p>

        <Button className="bg-white text-primary hover:bg-gray-100">ابدأ الآن</Button>
      </div>
    </section>
  )
}

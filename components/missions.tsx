import { Lock, Globe, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Mission() {
  const items = [
    {
      icon: Lock,
      title: "الحماية",
      description: "نحن نسعى للدفاع عن الأمن السيبراني الوطني من خلال الابتكار والخبرة المتقدمة",
    },
    {
      icon: Globe,
      title: "الالتزام",
      description: "نعمل على حماية الأنظمة الحكومية والاستراتيجية الحيوية في الدولة",
    },
    {
      icon: Settings,
      title: "التطوير",
      description: "تقديم أحدث الحلول الأمنية والتدريبات المتخصصة للكوادر الجزائرية",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white" id="missions">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">مهمتنا</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نحن متخصصون في تعزيز الأمن السيبراني من خلال التدريب المتقدم والاستشارات والأبحاث المتقدمة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="p-8 bg-green-50 border border-muted hover:shadow-lg transition">
                <div className="mb-4 inline-flex p-3 bg-primary text-primary-foreground rounded-lg">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

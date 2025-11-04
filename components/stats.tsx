import { MessageSquare, Users, TrendingUp, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Stats() {
  const stats = [
    {
      icon: MessageSquare,
      number: "485",
      label: "المشاورات",
      description: "تقديم الاستشارات المتخصصة والدعم الفني",
    },
    {
      icon: Users,
      number: "2,540",
      label: "المتدربين",
      description: "تدريب متقدم في مجالات الأمن السيبراني",
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "رضا العملاء",
      description: "نسبة عالية من رضا عملائنا",
    },
    {
      icon: BookOpen,
      number: "127",
      label: "الدراسات والأبحاث",
      description: "أبحاث متقدمة في مجالات الأمن السيبراني",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white" id="stats">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">الأثر والدراجات</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تأثيرنا المتزايد في مجال الأمن السيبراني الوطني والإقليمي
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-8 flex items-start gap-6 border border-muted hover:shadow-lg transition">
                <div className="flex-shrink-0">
                  <div className="inline-flex p-3 bg-primary text-primary-foreground rounded-lg">
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Card } from "@/components/ui/card"

export default function Solutions() {
  return (
    <section className="py-20 md:py-32 bg-muted/30" id="solution">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">حلول أمن سيبراني شاملة</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الحلول الأمنية والخدمات الاستشارية والتدريبية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex p-2 bg-primary text-primary-foreground rounded-lg">🛡️</span>
                تدريب خواص
              </h3>
              <p className="text-muted-foreground">
                برامج تدريبية متخصصة ومكثفة للكوادر الوطنية في مختلف مجالات الأمن السيبراني والدفاع عن الأنظمة
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex p-2 bg-primary text-primary-foreground rounded-lg">🔐</span>
                استشارات عملياتية
              </h3>
              <p className="text-muted-foreground">
                تقديم استشارات متقدمة في مجالات الأمن السيبراني والحماية من التهديدات والهجمات الرقمية
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-flex p-2 bg-primary text-primary-foreground rounded-lg">📊</span>
                أبحاث متقدمة
              </h3>
              <p className="text-muted-foreground">
                إجراء أبحاث علمية متقدمة وتطوير حلول مبتكرة في مجالات الأمن السيبراني والتكنولوجيا الحديثة
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-xl">
              <img
                src="/man.jpg"
                alt="Cybersecurity solutions"
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

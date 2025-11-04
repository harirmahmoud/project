export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 border-t-4 border-yellow-400" id="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">CyberGuardAlgeria</h3>
            <p className="text-sm opacity-90">
              متخصصون في تعزيز الأمن السيبراني الوطني والدفاع عن البنية التحتية الرقمية
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">الخدمات</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  تدريب متخصص
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  استشارات
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  أبحاث وتطوير
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  الدعم الفني
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-sm">
              <p>البريد الإلكتروني: info@cyberguard.dz</p>
              <p>الهاتف: +213 (0) 123 456 789</p>
              <p>الموقع: الجزائر</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>© 2025 جميع الحقوق محفوظة - CyberGuardAlgeria</p>
        </div>
      </div>
    </footer>
  )
}

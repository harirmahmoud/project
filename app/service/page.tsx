'use client';

// This is the main component for your service request page.
export default function ServiceRequestPage() {
  
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You would handle your form data submission logic here,
    // e.g., send it to an API endpoint.
    alert('Form submitted! (Add your API logic here)');
  };

  return (
    // Set the page direction to RTL and add background color
    <main dir="rtl" className="bg-gray-50 min-h-screen p-4 md:p-8 flex items-center justify-center">
      
      <div className="max-w-4xl w-full">
        
        {/* Page Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            طلب خدمة
          </h1>
          <p className="text-lg text-gray-600">
            يرجى ملء النموذج أدناه لطلب الخدمة التي تحتاجها.
          </p>
        </div>

        {/* Form Card */}
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-10 rounded-lg shadow-xl w-full"
        >
          
          {/* Form Header */}
          <div className="mb-8 border-b pb-4 border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">
              نموذج طلب خدمة
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              وصف الخدمة المطلوبة
            </p>
          </div>

          {/* Grid Layout for top fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="أدخل اسمك الكامل"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="أدخل رقم هاتفك"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                المؤسسة أو الجهة التابعة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="organization"
                placeholder="أدخل اسم المؤسسة أو الجهة التابعة"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="mb-5">
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
              نوع الخدمة المطلوبة <span className="text-red-500">*</span>
            </label>
            <select
              id="serviceType"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              required
              defaultValue=""
            >
              <option value="" disabled>اختر نوع الخدمة المطلوبة</option>
              <option value="support">دعم فني</option>
              <option value="consulting">استشارة</option>
              <option value="development">تطوير</option>
            </select>
          </div>

          {/* Priority Level */}
          <div className="mb-5">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              مستوى الأولوية <span className="text-red-500">*</span>
            </label>
            <select
              id="priority"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              required
              defaultValue=""
            >
              <option value="" disabled>اختر مستوى الأولوية</option>
              <option value="low">منخفض</option>
              <option value="medium">متوسط</option>
              <option value="high">عالي</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              وصف الخدمة المطلوبة <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="صف تفاصيل الخدمة التي تحتاجها"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-x-3 px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-md shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-300"
            >
              <span>إرسال الطلب</span>
              
              {/* Inline SVG for the paper plane icon, rotated for RTL */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 transform -rotate-90"
              >
                <path d="M3.105 3.106a.75.75 0 01.07.02l14.44 6.233a.75.75 0 010 1.279L3.175 16.874a.75.75 0 01-1.07-.64V3.766a.75.75 0 011.001-.66z" />
              </svg>

            </button>
          </div>
          
        </form>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import { Navbar, Footer, Chatbot } from "../components/layout";
import { SectionHeader } from "../components/ui";
import { LocationIcon, PhoneIcon, EmailIcon, WhatsAppIcon } from "../components/Icons";
import { useLanguage } from "../context/LanguageContext";

const contactInfoData = {
  en: [
    {
      icon: LocationIcon,
      title: "Address",
      details: ["Industrial zone, South of Port Said", "58 Factories Complex, factory No.65 & No.66"],
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      details: ["+201222493500"],
      links: ["tel:+201222493500"],
    },
    {
      icon: EmailIcon,
      title: "Email",
      details: ["info@edgeforgarments.com"],
      links: ["mailto:info@edgeforgarments.com"],
    },
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      details: ["+201222493500"],
      links: ["https://wa.me/201222493500"],
    },
  ],
  ar: [
    {
      icon: LocationIcon,
      title: "العنوان",
      details: ["المنطقة الصناعية، جنوب بورسعيد", "مجمع 58 مصنع، مصنع رقم 65 و 66"],
    },
    {
      icon: PhoneIcon,
      title: "الهاتف",
      details: ["+201222493500"],
      links: ["tel:+201222493500"],
    },
    {
      icon: EmailIcon,
      title: "البريد الإلكتروني",
      details: ["info@edgeforgarments.com"],
      links: ["mailto:info@edgeforgarments.com"],
    },
    {
      icon: WhatsAppIcon,
      title: "واتساب",
      details: ["+201222493500"],
      links: ["https://wa.me/201222493500"],
    },
  ],
};

const faqData = {
  en: [
    {
      id: 1,
      q: "What is your minimum order quantity?",
      a: "Our standard MOQ is 500 pieces per style/color. However, we can discuss flexibility for initial orders or sample runs.",
    },
    {
      id: 2,
      q: "How long does production take?",
      a: "Standard production lead time is 45-60 days from order confirmation, depending on complexity and quantity.",
    },
    {
      id: 3,
      q: "Do you provide samples?",
      a: "Yes, we offer sample development services. Sample lead time is typically 7-14 days.",
    },
    {
      id: 4,
      q: "What payment terms do you accept?",
      a: "We typically work with 30% deposit upon order confirmation and 70% before shipment. L/C payments are also accepted.",
    },
    {
      id: 5,
      q: "Can you ship internationally?",
      a: "Yes, we ship worldwide. Our location in Port Said Free Zone enables efficient export logistics.",
    },
  ],
  ar: [
    {
      id: 1,
      q: "ما هو الحد الأدنى للطلب؟",
      a: "الحد الأدنى القياسي هو 500 قطعة لكل نمط/لون. ومع ذلك، يمكننا مناقشة المرونة للطلبات الأولى أو العينات.",
    },
    {
      id: 2,
      q: "كم يستغرق الإنتاج؟",
      a: "مدة الإنتاج القياسية هي 45-60 يوم من تأكيد الطلب، حسب التعقيد والكمية.",
    },
    {
      id: 3,
      q: "هل توفرون عينات؟",
      a: "نعم، نقدم خدمات تطوير العينات. مدة إعداد العينة عادة 7-14 يوم.",
    },
    {
      id: 4,
      q: "ما هي شروط الدفع المقبولة؟",
      a: "نعمل عادة بمقدم 30% عند تأكيد الطلب و70% قبل الشحن. كما نقبل الدفع بخطاب اعتماد.",
    },
    {
      id: 5,
      q: "هل تشحنون دولياً؟",
      a: "نعم، نشحن لجميع أنحاء العالم. موقعنا في المنطقة الحرة ببورسعيد يتيح لوجستيات تصدير فعالة.",
    },
  ],
};

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#1A4AFF] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function ContactPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const { language, dir } = useLanguage();
  const isRTL = dir === "rtl";
  
  const contactInfo = contactInfoData[language];
  const faqs = faqData[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header with Background Image */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#122D8B]/85" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-3xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            <div className={`w-16 h-1 bg-[#1A4AFF] mb-8 ${isRTL ? "mr-0 ml-auto" : ""}`} />
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold uppercase tracking-wide mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
            >
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL 
                ? "هل أنت مستعد لبدء مشروعك؟ تواصل مع فريقنا. نحن هنا للإجابة على أسئلتك وتقديم عروض الأسعار."
                : "Ready to start your project? Get in touch with our team. We're here to answer your questions and provide quotes."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 border-b border-[#D8DDE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <div key={info.title} className={`text-center p-6 border border-[#D8DDE9] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                <info.icon className="w-8 h-8 text-[#1A4AFF] mx-auto mb-4" />
                <h3
                  className={`text-[#122D8B] font-bold uppercase tracking-wide mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', sans-serif" }}
                >
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={`${info.title}-${i}`} className="text-[#122D8B]/60 text-sm">
                    {info.links ? (
                      <a href={info.links[i]} className="hover:text-[#1A4AFF] transition-colors">
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 ${isRTL ? "direction-rtl" : ""}`}>
            {/* Form */}
            <div className={isRTL ? "lg:order-2 text-right" : ""}>
              <SectionHeader title={isRTL ? "أرسل لنا رسالة" : "Send Us a Message"} centered={false} />
              <p className={`text-[#122D8B]/70 mb-8 -mt-10 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL 
                  ? "املأ النموذج أدناه وسيتواصل معك فريقنا خلال 24 ساعة."
                  : "Fill out the form below and our team will get back to you within 24 hours."}
              </p>

              {submitStatus === "success" && (
                <div className={`mb-6 p-4 bg-green-50 border border-green-200 rounded-lg ${isRTL ? "text-right" : ""}`}>
                  <p className={`text-green-800 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً." : "Your message was sent successfully! We'll get back to you soon."}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-lg ${isRTL ? "text-right" : ""}`}>
                  <p className={`text-red-800 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى." : "An error occurred while sending your message. Please try again."}
                  </p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
                      placeholder={isRTL ? "اسمك" : "Your name"}
                    />
                  </div>
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "اسم الشركة" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
                      placeholder={isRTL ? "شركتك" : "Your company"}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${isRTL ? "text-right" : ""}`}
                      placeholder={isRTL ? "بريدك@email.com" : "your@email.com"}
                    />
                  </div>
                  <div>
                    <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors ${isRTL ? "text-right" : ""}`}
                      placeholder="+20 xxx xxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "الموضوع *" : "Subject *"}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors bg-white ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
                  >
                    <option value="">{isRTL ? "اختر موضوعاً" : "Select a subject"}</option>
                    <option value="Request a Quote">{isRTL ? "طلب عرض سعر" : "Request a Quote"}</option>
                    <option value="Sample Request">{isRTL ? "طلب عينة" : "Sample Request"}</option>
                    <option value="Partnership Inquiry">{isRTL ? "استفسار شراكة" : "Partnership Inquiry"}</option>
                    <option value="Customer Support">{isRTL ? "دعم العملاء" : "Customer Support"}</option>
                    <option value="Other">{isRTL ? "أخرى" : "Other"}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[#122D8B] text-sm font-medium mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "الرسالة *" : "Message *"}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border border-[#D8DDE9] focus:border-[#1A4AFF] focus:outline-none transition-colors resize-none ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}
                    placeholder={isRTL ? "أخبرنا عن متطلبات مشروعك، الكميات، الجدول الزمني، إلخ." : "Tell us about your project requirements, quantities, timeline, etc."}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-8 py-4 bg-[#1A4AFF] text-white font-semibold tracking-wide hover:bg-[#122D8B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  {isSubmitting 
                    ? (isRTL ? "جاري الإرسال..." : "Sending...") 
                    : (isRTL ? "إرسال الرسالة" : "Send Message")}
                </button>
              </form>
            </div>

            {/* Map & Info */}
            <div className={isRTL ? "lg:order-1" : ""}>
              <div className="aspect-video bg-[#D8DDE9] relative mb-8 overflow-hidden rounded-lg">
                {/* Google Maps Embed - Edge Factory Port Said */}
                <iframe
                  src="https://maps.google.com/maps?q=%D9%85%D8%B5%D9%86%D8%B9%20%D8%A5%D9%8A%D8%AF%D8%AC%20%D9%84%D9%84%D9%85%D9%84%D8%A7%D8%A8%D8%B3%20%D8%A7%D9%84%D8%AC%D8%A7%D9%87%D8%B2%D8%A9&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              <div className={`p-8 border border-[#D8DDE9] ${isRTL ? "text-right" : ""}`}>
                <h3
                  className={`text-xl text-[#122D8B] mb-6 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
                >
                  {isRTL ? "ساعات العمل" : "Office Hours"}
                </h3>
                <div className="space-y-4">
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{isRTL ? "الأحد - الخميس" : "Sunday - Thursday"}</span>
                    <span className="text-[#122D8B] font-medium">{isRTL ? "8:00 ص - 5:00 م" : "8:00 AM - 5:00 PM"}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{isRTL ? "الجمعة - السبت" : "Friday - Saturday"}</span>
                    <span className={`text-[#122D8B] font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{isRTL ? "مغلق" : "Closed"}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[#D8DDE9]">
                  <p className={`text-[#122D8B]/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL 
                      ? "للاستفسارات العاجلة خارج ساعات العمل، يرجى استخدام الواتساب أو البريد الإلكتروني."
                      : "For urgent inquiries outside office hours, please use WhatsApp or email."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section - Port Said */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#122D8B" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map/Image Side */}
            <div className={`relative ${isRTL ? "lg:order-2" : ""}`}>
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                {/* Google Maps Embed */}
                <iframe
                  src="https://maps.google.com/maps?q=%D9%85%D8%B5%D9%86%D8%B9%20%D8%A5%D9%8A%D8%AF%D8%AC%20%D9%84%D9%84%D9%85%D9%84%D8%A7%D8%A8%D8%B3%20%D8%A7%D9%84%D8%AC%D8%A7%D9%87%D8%B2%D8%A9&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/60 to-transparent pointer-events-none" />
                
                {/* Location Pin */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 pointer-events-none">
                  <div className="w-12 h-12 bg-[#1A4AFF] rounded-full flex items-center justify-center">
                    <LocationIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-white font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "المنطقة الحرة ببورسعيد" : "Port Said Free Zone"}
                    </p>
                    <p className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "بورسعيد، مصر" : "Port Said, Egypt"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className={`${isRTL ? "lg:order-1 text-right" : ""}`}>
              <div className={`w-16 h-1 bg-[#1A4AFF] mb-6 ${isRTL ? "mr-0 ml-auto" : ""}`} />
              <h2
                className={`text-3xl md:text-4xl text-white font-bold uppercase tracking-wide mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
              >
                {isRTL ? "موقعنا الاستراتيجي" : "Strategic Location"}
              </h2>
              <p className={`text-white/80 text-lg leading-relaxed mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL 
                  ? "نقع في المنطقة الحرة ببورسعيد، واحدة من أهم المناطق الصناعية في مصر. موقعنا الاستراتيجي على مدخل قناة السويس يمنحنا ميزة لوجستية فريدة للتصدير لجميع أنحاء العالم."
                  : "Located in the Port Said Free Zone, one of Egypt's most important industrial zones. Our strategic position at the entrance of the Suez Canal gives us a unique logistical advantage for global exports."}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 bg-[#1A4AFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1A4AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`text-white font-semibold mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "شحن سريع" : "Fast Shipping"}
                    </h4>
                    <p className={`text-white/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "وصول سريع لأوروبا وآسيا" : "Quick access to Europe & Asia"}
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 bg-[#1A4AFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1A4AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`text-white font-semibold mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "منطقة حرة" : "Free Zone"}
                    </h4>
                    <p className={`text-white/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "مزايا ضريبية وجمركية" : "Tax & customs benefits"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Accordion Style */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className={`mb-14 ${isRTL ? "text-right" : "text-center"}`}>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <p className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : "max-w-xl mx-auto"}`}>
              {isRTL ? "إجابات سريعة على الأسئلة المتكررة" : "Quick answers to common questions"}
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  className={`w-full px-6 py-5 flex items-center hover:bg-[#F8F9FA]/50 transition-colors ${isRTL ? "flex-row-reverse justify-end text-right" : "justify-between text-left"}`}
                >
                  <span className={`font-semibold text-[#122D8B] ${isRTL ? "pr-4 font-[var(--font-cairo)]" : "pr-4"}`}>
                    {faq.q}
                  </span>
                  <ChevronIcon isOpen={openFaqId === faq.id} />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqId === faq.id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className={`px-6 pb-5 text-[#122D8B]/70 leading-relaxed ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}

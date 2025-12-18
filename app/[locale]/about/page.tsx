import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isValidLocale, siteUrl, getDirection, type Locale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import {
  ReliabilityIcon,
  QualityIcon,
  ProfessionalismIcon,
  InnovationIcon,
  TransparencyIcon,
  FlexibilityIcon,
} from "../../components/Icons";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/about`;

  return {
    title: isRTL ? "عن إيدج | إيدج للملابس" : "About Us | EDGE for Garments",
    description: isRTL
      ? "شركة مصرية رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة منذ 2008"
      : "A leading Egyptian manufacturer delivering premium denim and woven garments since 2008",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/about`,
        ar: `${siteUrl}/ar/about`,
        "x-default": `${siteUrl}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const milestones = isRTL
    ? [
        { year: "2008", title: "تأسيس الشركة", description: "تأسست إيدج في المنطقة الحرة ببورسعيد" },
        { year: "2012", title: "التوسع الدولي", description: "بدأنا خدمة العلامات التجارية الأوروبية" },
        { year: "2016", title: "تطوير المنشأة", description: "توسيع القدرة الإنتاجية بنسبة 200%" },
        { year: "2020", title: "التركيز على الاستدامة", description: "تطبيق الممارسات الصديقة للبيئة" },
        { year: "2024", title: "التحول الرقمي", description: "اعتماد تقنيات الصناعة 4.0" },
      ]
    : [
        { year: "2008", title: "Company Founded", description: "EDGE established in Port Said Free Zone" },
        { year: "2012", title: "International Expansion", description: "Started serving European brands" },
        { year: "2016", title: "Facility Upgrade", description: "Expanded production capacity by 200%" },
        { year: "2020", title: "Sustainability Focus", description: "Implemented eco-friendly practices" },
        { year: "2024", title: "Digital Transformation", description: "Adopted Industry 4.0 technologies" },
      ];

  const values = isRTL
    ? [
        { icon: ReliabilityIcon, title: "الموثوقية", description: "تسليم ثابت وشراكات يمكن الاعتماد عليها" },
        { icon: QualityIcon, title: "الجودة", description: "اهتمام دقيق بالتفاصيل في كل غرزة" },
        { icon: ProfessionalismIcon, title: "الاحترافية", description: "معايير رائدة في الصناعة وخبرة عالية" },
        { icon: InnovationIcon, title: "الابتكار", description: "تبني التقنيات والأساليب الجديدة" },
        { icon: TransparencyIcon, title: "الشفافية", description: "تواصل مفتوح وعمليات واضحة" },
        { icon: FlexibilityIcon, title: "المرونة", description: "حلول قابلة للتكيف مع المتطلبات الفريدة" },
      ]
    : [
        { icon: ReliabilityIcon, title: "Reliability", description: "Consistent delivery and dependable partnerships" },
        { icon: QualityIcon, title: "Quality", description: "Meticulous attention to detail in every stitch" },
        { icon: ProfessionalismIcon, title: "Professionalism", description: "Industry-leading standards and expertise" },
        { icon: InnovationIcon, title: "Innovation", description: "Embracing new technologies and methods" },
        { icon: TransparencyIcon, title: "Transparency", description: "Open communication and clear processes" },
        { icon: FlexibilityIcon, title: "Flexibility", description: "Adaptable solutions for unique requirements" },
      ];

  const stats = isRTL
    ? [
        { number: "+15", label: "سنوات الخبرة" },
        { number: "+500", label: "عامل ماهر" },
        { number: "+50", label: "شريك تجاري" },
        { number: "+1M", label: "قطعة سنوياً" },
      ]
    : [
        { number: "15+", label: "Years Experience" },
        { number: "500+", label: "Skilled Workers" },
        { number: "50+", label: "Brand Partners" },
        { number: "1M+", label: "Garments Annually" },
      ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar locale={locale} dict={dict} />

      {/* Page Header */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
            alt="EDGE Factory Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#122D8B]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-3xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            <div className={`w-16 h-1 bg-[#1A4AFF] mb-8 ${isRTL ? "mr-0 ml-auto" : ""}`} />
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold uppercase tracking-wide mb-6 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {isRTL ? "عن إيدج" : "About EDGE"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL
                ? "شركة مصرية رائدة في تصنيع الدنيم الفاخر والملابس الجاهزة للعلامات التجارية العالمية منذ عام 2008."
                : "A leading Egyptian manufacturer delivering premium denim and woven garments to brands worldwide since 2008."}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ backgroundColor: "#122D8B" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl text-white font-bold mb-2">{stat.number}</div>
                <div className={`text-white/60 text-sm uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "رحلتنا" : "Our Journey"}
            </h2>
          </div>

          <div className="relative">
            <div className={`absolute top-0 bottom-0 w-0.5 bg-[#B6C6E1] ${isRTL ? "right-8 lg:right-1/2" : "left-8 lg:left-1/2"}`} />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 ${
                    isRTL
                      ? index % 2 === 0
                        ? "lg:flex-row-reverse"
                        : "lg:flex-row"
                      : index % 2 === 0
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 bg-[#1A4AFF] z-10 ${
                      isRTL ? "right-8 lg:right-1/2 translate-x-1/2" : "left-8 lg:left-1/2 -translate-x-1/2"
                    }`}
                  />

                  <div
                    className={`lg:w-1/2 ${
                      isRTL
                        ? `pr-20 lg:pr-0 ${index % 2 === 0 ? "lg:pl-16 lg:text-left" : "lg:pr-16 lg:text-right"}`
                        : `pl-20 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`
                    }`}
                  >
                    <div className="text-[#1A4AFF] font-bold text-2xl mb-2">{milestone.year}</div>
                    <h3 className={`text-[#122D8B] font-bold text-lg mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {milestone.title}
                    </h3>
                    <p className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "قيمنا" : "Our Values"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`p-8 border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-colors group ${
                  isRTL ? "text-right" : ""
                }`}
              >
                <value.icon
                  className={`w-12 h-12 text-[#122D8B] group-hover:text-[#1A4AFF] transition-colors mb-6 ${
                    isRTL ? "mr-0 ml-auto" : ""
                  }`}
                />
                <h3 className={`text-lg text-[#122D8B] mb-3 font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {value.title}
                </h3>
                <p className={`text-[#122D8B]/60 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}

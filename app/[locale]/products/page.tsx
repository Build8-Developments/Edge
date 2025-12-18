import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, siteUrl, getDirection, type Locale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/products`;

  return {
    title: isRTL ? "منتجاتنا | إيدج للملابس" : "Our Products | EDGE for Garments",
    description: isRTL
      ? "ملابس عالية الجودة مصنوعة بدقة. من الدنيم الكلاسيكي إلى التصميمات المخصصة"
      : "Quality garments crafted with precision. From classic denim to custom designs",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/products`,
        ar: `${siteUrl}/ar/products`,
        "x-default": `${siteUrl}/en/products`,
      },
    },
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const productCategories = isRTL
    ? [
        {
          title: "جينز",
          slug: "jeans",
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
          description: "جينز دنيم كلاسيكي وعصري للرجال والنساء والأطفال",
          features: ["قصات ضيقة وعادية ومريحة", "غسلات متنوعة متاحة", "جودة دنيم فاخرة", "تصميمات مخصصة مرحب بها"],
        },
        {
          title: "جاكيتات دنيم",
          slug: "denim-jackets",
          image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
          description: "ملابس خارجية دنيم فاخرة بأنماط وتشطيبات متنوعة",
          features: ["جاكيتات تراكر", "خيارات مبطنة بالشيربا", "علامات تجارية مخصصة", "معالجات غسيل متنوعة"],
        },
        {
          title: "ملابس العمل",
          slug: "workwear",
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
          description: "ملابس مهنية متينة مصممة لتدوم",
          features: ["بناء شديد التحمل", "خياطة معززة", "خيارات جيوب متعددة", "تصميمات متوافقة مع السلامة"],
        },
        {
          title: "قمصان",
          slug: "shirts",
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
          description: "قمصان منسوجة وملابس كاجوال لجميع المناسبات",
          features: ["قمصان دنيم", "خيارات شامبراي", "أنماط كاجوال ورسمية", "أنماط مخصصة"],
        },
        {
          title: "ملابس مخصصة",
          slug: "custom",
          image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
          description: "تصنيع مخصص لتصميماتك الفريدة",
          features: ["تصميماتك، خبرتنا", "دعم تطوير كامل", "من النموذج للإنتاج", "حد أدنى مرن للطلب"],
        },
        {
          title: "العلامة الخاصة",
          slug: "private-label",
          image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
          description: "حلول العلامة البيضاء لعلامتك التجارية",
          features: ["حزمة علامة تجارية كاملة", "ملصقات وبطاقات مخصصة", "حلول التغليف", "جودة مضمونة"],
        },
      ]
    : [
        {
          title: "Jeans",
          slug: "jeans",
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
          description: "Classic and modern denim jeans for men, women, and children",
          features: ["Slim, Regular, Relaxed fits", "Various washes available", "Premium denim quality", "Custom designs welcome"],
        },
        {
          title: "Denim Jackets",
          slug: "denim-jackets",
          image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
          description: "Premium denim outerwear with various styles and finishes",
          features: ["Trucker jackets", "Sherpa lined options", "Custom branding", "Various wash treatments"],
        },
        {
          title: "Workwear",
          slug: "workwear",
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
          description: "Durable professional apparel built to last",
          features: ["Heavy-duty construction", "Reinforced stitching", "Multiple pocket options", "Safety compliant designs"],
        },
        {
          title: "Shirts",
          slug: "shirts",
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
          description: "Woven shirts and casual wear for all occasions",
          features: ["Denim shirts", "Chambray options", "Casual and formal styles", "Custom patterns"],
        },
        {
          title: "Custom Garments",
          slug: "custom",
          image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
          description: "Tailored manufacturing for your unique designs",
          features: ["Your designs, our expertise", "Full development support", "Prototype to production", "Flexible MOQs"],
        },
        {
          title: "Private Label",
          slug: "private-label",
          image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
          description: "White-label solutions for your brand",
          features: ["Complete branding package", "Custom labels and tags", "Packaging solutions", "Quality guaranteed"],
        },
      ];

  const capabilities = isRTL
    ? [
        { label: "الحد الأدنى للطلب", value: "500 قطعة" },
        { label: "مدة التسليم", value: "45-60 يوم" },
        { label: "تطوير العينات", value: "7-14 يوم" },
        { label: "الطاقة السنوية", value: "+1M قطعة" },
      ]
    : [
        { label: "Minimum Order Quantity", value: "500 pcs" },
        { label: "Lead Time", value: "45-60 days" },
        { label: "Sample Development", value: "7-14 days" },
        { label: "Annual Capacity", value: "1M+ pieces" },
      ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar locale={locale} dict={dict} />

      {/* Page Header */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=1920&q=80"
            alt="Products Background"
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
              {isRTL ? "منتجاتنا" : "Our Products"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL
                ? "ملابس عالية الجودة مصنوعة بدقة. من الدنيم الكلاسيكي إلى التصميمات المخصصة، نصنع منتجات تلبي أعلى المعايير."
                : "Quality garments crafted with precision. From classic denim to custom designs, we manufacture products that meet the highest standards."}
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Bar */}
      <section className="py-8 border-b border-[#D8DDE9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.label} className={`text-center lg:text-left ${isRTL ? "lg:text-right" : ""}`}>
                <div className={`text-[#122D8B]/50 text-sm uppercase tracking-wide mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {cap.label}
                </div>
                <div className={`text-[#122D8B] text-xl font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{cap.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "فئات المنتجات" : "Product Categories"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((product) => (
              <div
                key={product.slug}
                className={`group border border-[#D8DDE9] hover:border-[#1A4AFF]/30 transition-all ${isRTL ? "text-right" : ""}`}
              >
                <div className="aspect-[4/3] bg-[#D8DDE9] relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className={`absolute bottom-0 w-0 h-1 bg-[#1A4AFF] group-hover:w-full transition-all duration-300 ${
                      isRTL ? "right-0" : "left-0"
                    }`}
                  />
                </div>

                <div className="p-6">
                  <h3 className={`text-xl text-[#122D8B] mb-3 font-bold uppercase tracking-wide ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {product.title}
                  </h3>
                  <p className={`text-[#122D8B]/60 text-sm mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{product.description}</p>

                  <ul className={`space-y-2 mb-6 ${isRTL ? "text-right" : ""}`}>
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 text-sm text-[#122D8B]/70 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                      >
                        <div className="w-1.5 h-1.5 bg-[#1A4AFF] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${locale}/contact`}
                    className={`text-[#1A4AFF] font-semibold text-sm uppercase tracking-wide hover:text-[#122D8B] transition-colors inline-flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""
                    }`}
                  >
                    {isRTL ? "استفسر الآن" : "Inquire Now"}
                    <span>{isRTL ? "←" : "→"}</span>
                  </Link>
                </div>
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

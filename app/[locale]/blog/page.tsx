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
  const currentUrl = `${siteUrl}/${locale}/blog`;

  return {
    title: isRTL ? "المدونة والأخبار | إيدج للملابس" : "Blog & News | EDGE for Garments",
    description: isRTL
      ? "تابع آخر أخبارنا وإنجازاتنا والزيارات الرسمية لمصنعنا"
      : "Stay updated with our latest news, achievements, and official visits to our factory",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/blog`,
        ar: `${siteUrl}/ar/blog`,
        "x-default": `${siteUrl}/en/blog`,
      },
    },
  };
}

const blogPosts = [
  {
    id: "1",
    slug: "prime-minister-visit",
    title: {
      en: "The Visit of the Prime Minister and the Governor of Port Said",
      ar: "زيارة رئيس الوزراء ومحافظ بورسعيد",
    },
    excerpt: {
      en: "The Prime Minister inspects the Edge factory for ready-to-wear clothes in Port Said.",
      ar: "رئيس الوزراء يتفقد مصنع إيدج للملابس الجاهزة في بورسعيد.",
    },
    date: "December 16, 2020",
    category: { en: "News", ar: "أخبار" },
    image: "https://edgeforgarments.com/wp-content/uploads/2020/11/125231717_230544125072450_6821586552934938452_n.jpg",
    featured: true,
  },
  {
    id: "2",
    slug: "committee-visit",
    title: {
      en: "The Visit of the Distinguished Members of the Esteemed Committee",
      ar: "زيارة الأعضاء المتميزين من اللجنة الموقرة",
    },
    excerpt: {
      en: "The visit on the occasion of the inauguration of the new Edge Garment Factory.",
      ar: "زيارة بمناسبة افتتاح مصنع إيدج الجديد للملابس.",
    },
    date: "December 16, 2020",
    category: { en: "News", ar: "أخبار" },
    image: "https://edgeforgarments.com/wp-content/uploads/2020/12/87313942_157047515755445_671847753994731520_o.jpg",
  },
  {
    id: "3",
    slug: "governor-visit",
    title: {
      en: "The Visit of Major General Adel Ghadhban, Governor of Port Said",
      ar: "زيارة اللواء عادل الغضبان محافظ بورسعيد",
    },
    excerpt: {
      en: "The visit of the Governor to the Edge Factory for Ready-Made Garments.",
      ar: "زيارة المحافظ لمصنع إيدج للملابس الجاهزة.",
    },
    date: "November 12, 2020",
    category: { en: "News", ar: "أخبار" },
    image: "https://edgeforgarments.com/wp-content/uploads/2020/11/87025445_1791634644305092_4180343608236310528_n.jpg",
  },
];

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-white" dir={dir}>
      <Navbar locale={locale} dict={dict} />

      {/* Page Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
            alt="Blog background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#122D8B]/90 to-[#0a1a4f]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-3xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold uppercase tracking-wide mb-6 ${
                isRTL ? "font-[var(--font-cairo)]" : ""
              }`}
            >
              {isRTL ? "المدونة والأخبار" : "Blog & News"}
            </h1>
            <p className={`text-white/80 text-lg lg:text-xl leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL
                ? "تابع آخر أخبارنا وإنجازاتنا والزيارات الرسمية لمصنعنا"
                : "Stay updated with our latest news, achievements, and official visits to our factory"}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 lg:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <Link href={`/${locale}/blog/${featuredPost.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl lg:order-1">
                  <Image
                    src={featuredPost.image}
                    alt={isRTL ? featuredPost.title.ar : featuredPost.title.en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                    <span className={`inline-block bg-[#1A4AFF] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "مميز" : "Featured"}
                    </span>
                  </div>
                </div>
                <div className={`lg:order-2 ${isRTL ? "text-right" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[#1A4AFF] text-sm font-semibold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? featuredPost.category.ar : featuredPost.category.en}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 text-sm">{featuredPost.date}</span>
                  </div>
                  <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold text-[#122D8B] mb-4 group-hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? featuredPost.title.ar : featuredPost.title.en}
                  </h2>
                  <p className={`text-slate-600 text-lg leading-relaxed mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? featuredPost.excerpt.ar : featuredPost.excerpt.en}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#1A4AFF] font-semibold group-hover:gap-3 transition-all">
                    <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "اقرأ المزيد" : "Read More"}</span>
                    <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className={`text-2xl lg:text-3xl font-bold text-[#122D8B] mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "جميع المقالات" : "All Articles"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={isRTL ? post.title.ar : post.title.en}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className={`p-6 ${isRTL ? "text-right" : ""}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[#1A4AFF] text-xs font-semibold uppercase ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? post.category.ar : post.category.en}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 text-xs">{post.date}</span>
                  </div>
                  <h3 className={`text-lg font-bold text-[#122D8B] mb-3 line-clamp-2 group-hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? post.title.ar : post.title.en}
                  </h3>
                  <p className={`text-slate-500 text-sm line-clamp-2 mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? post.excerpt.ar : post.excerpt.en}
                  </p>
                  <div className="flex items-center gap-1 text-[#1A4AFF] text-sm font-medium group-hover:gap-2 transition-all">
                    <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "اقرأ المزيد" : "Read More"}</span>
                    <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}

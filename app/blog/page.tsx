"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, Chatbot } from "../components/layout";
import { useLanguage } from "../context/LanguageContext";

interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  date: string;
  category: {
    en: string;
    ar: string;
  };
  image: string;
  gallery?: string[];
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "prime-minister-visit",
    title: {
      en: "The Visit of the Prime Minister and the Governor of Port Said",
      ar: "زيارة رئيس الوزراء ومحافظ بورسعيد",
    },
    excerpt: {
      en: "The Prime Minister inspects the Edge factory for ready-to-wear clothes in Port Said, and holds discussions with workers.",
      ar: "رئيس الوزراء يتفقد مصنع إيدج للملابس الجاهزة في بورسعيد، ويجري نقاشات مع العمال.",
    },
    content: {
      en: `The prime minister inspects the "Edge" factory for ready-to-wear clothes in Port Said, and holds discussions with workers.

The Governor of Port Said was so proud of the youth of the industrial communities after their success in conquering their products on global markets.

During his visit to Port Said governorate today, Dr. Mustafa Madbouly, Prime Minister, his accompanying delegation, and Major General Adel Ghadhban, Governor of Port Said, inspected the "Edge" factory for ready-to-wear clothes in Port Said.

Company officials said: "Work began in the factory in 2016, with 200 workers, indicating that the production amounted to 900 thousand trousers annually, and part of the production is exported to Europe and the United States, and the remaining part is put on the local markets."

During his tour in the factory, the prime minister had conversations with a number of workers in the factory, including a female worker who obtained a prep certificate, and had worked in the factory for a year. And she added that the factory provides her with transportation. The prime minister also inquired of another worker about his salary, and he replied that he had been working in the factory for two years, and had been paid 2,800 pounds per month.

Regarding whether they have any requests, the workers answered that they are satisfied with the job opportunities that have been achieved and obtained from the existence of such factories, which was confirmed by the Prime Minister that every factory established in Egypt opens houses and provides a decent life for Egyptian workers.

Major General Adel Al-Ghadhban, Governor of Port Said, confirmed that the youth of the 58 factory project and the 54 factories had proven their worth after they had succeeded in invading their products to international markets shortly after they had received the factories. Pointing out that the governorate provides all means of support for the serious investor who works to provide job opportunities for youth.`,
      ar: `يتفقد رئيس الوزراء مصنع "إيدج" للملابس الجاهزة في بورسعيد، ويجري نقاشات مع العمال.

كان محافظ بورسعيد فخوراً جداً بشباب المجتمعات الصناعية بعد نجاحهم في غزو منتجاتهم للأسواق العالمية.

خلال زيارته لمحافظة بورسعيد اليوم، قام الدكتور مصطفى مدبولي، رئيس الوزراء، والوفد المرافق له، واللواء عادل الغضبان، محافظ بورسعيد، بتفقد مصنع "إيدج" للملابس الجاهزة في بورسعيد.

وقال مسؤولو الشركة: "بدأ العمل في المصنع عام 2016، بـ 200 عامل، مشيرين إلى أن الإنتاج بلغ 900 ألف بنطلون سنوياً، ويتم تصدير جزء من الإنتاج إلى أوروبا والولايات المتحدة، ويطرح الجزء المتبقي في الأسواق المحلية."

خلال جولته في المصنع، أجرى رئيس الوزراء محادثات مع عدد من العمال في المصنع، بما في ذلك عاملة حصلت على شهادة إعدادية، وعملت في المصنع لمدة عام. وأضافت أن المصنع يوفر لها وسائل النقل. كما استفسر رئيس الوزراء من عامل آخر عن راتبه، فأجاب أنه يعمل في المصنع منذ عامين، وكان يتقاضى 2800 جنيه شهرياً.

وفيما يتعلق بما إذا كانت لديهم أي طلبات، أجاب العمال أنهم راضون عن فرص العمل التي تحققت وحصلوا عليها من وجود مثل هذه المصانع، وهو ما أكده رئيس الوزراء أن كل مصنع يقام في مصر يفتح بيوتاً ويوفر حياة كريمة للعمال المصريين.

وأكد اللواء عادل الغضبان، محافظ بورسعيد، أن شباب مشروع الـ 58 مصنعاً والـ 54 مصنعاً قد أثبتوا جدارتهم بعد أن نجحوا في غزو منتجاتهم للأسواق الدولية بعد فترة وجيزة من استلامهم المصانع. مشيراً إلى أن المحافظة توفر كل سبل الدعم للمستثمر الجاد الذي يعمل على توفير فرص العمل للشباب.`,
    },
    date: "December 16, 2020",
    category: {
      en: "News",
      ar: "أخبار",
    },
    image: "https://edgeforgarments.com/wp-content/uploads/2020/11/125231717_230544125072450_6821586552934938452_n.jpg",
    gallery: [
      "https://edgeforgarments.com/wp-content/uploads/2020/11/124952895_230544231739106_7908619298259705222_n-300x181.jpg",
      "https://edgeforgarments.com/wp-content/uploads/2020/11/125326618_230544251739104_7114983533161462777_n-300x260.jpg",
    ],
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
      en: "The visit of the distinguished members of the esteemed committee on the occasion of the inauguration of the new Edge Garment Factory.",
      ar: "زيارة الأعضاء المتميزين من اللجنة الموقرة بمناسبة افتتاح مصنع إيدج الجديد للملابس.",
    },
    content: {
      en: `The visit of the distinguished members of the esteemed committee, which had the merit after God Almighty in choosing the owners of the factories of the 58 factory… as well as the owners of the 58 factories.

All this on the occasion of the inauguration of the new Edge Garment Factory in the 118 Factory Complex.

This momentous occasion marked a significant milestone in our journey of growth and expansion. The committee members toured the facility, observing our state-of-the-art production lines and meeting with our dedicated workforce.

The inauguration ceremony was attended by key stakeholders and industry leaders, all of whom expressed their confidence in Edge Garments' commitment to quality and excellence in the garment manufacturing sector.`,
      ar: `زيارة الأعضاء المتميزين من اللجنة الموقرة، التي كان لها الفضل بعد الله تعالى في اختيار أصحاب مصانع الـ 58 مصنعاً... وكذلك أصحاب الـ 58 مصنعاً.

كل هذا بمناسبة افتتاح مصنع إيدج الجديد للملابس في مجمع الـ 118 مصنعاً.

شكلت هذه المناسبة الهامة علامة فارقة في رحلة نمونا وتوسعنا. قام أعضاء اللجنة بجولة في المنشأة، ولاحظوا خطوط الإنتاج الحديثة لدينا والتقوا بقوتنا العاملة المتفانية.

حضر حفل الافتتاح أصحاب المصلحة الرئيسيون وقادة الصناعة، وقد أعربوا جميعاً عن ثقتهم في التزام إيدج للملابس بالجودة والتميز في قطاع تصنيع الملابس.`,
    },
    date: "December 16, 2020",
    category: {
      en: "News",
      ar: "أخبار",
    },
    image: "https://edgeforgarments.com/wp-content/uploads/2020/12/87313942_157047515755445_671847753994731520_o.jpg",
    gallery: [
      "https://edgeforgarments.com/wp-content/uploads/2020/12/87768389_157047709088759_3543045778056413184_o-300x225.jpg",
    ],
  },
  {
    id: "3",
    slug: "governor-visit",
    title: {
      en: "The Visit of Major General Adel Ghadhban, Governor of Port Said",
      ar: "زيارة اللواء عادل الغضبان محافظ بورسعيد",
    },
    excerpt: {
      en: "The visit of Major General Adel Ghadhban, Governor of Port Said, to the Edge Factory for Ready-Made Garments.",
      ar: "زيارة اللواء عادل الغضبان، محافظ بورسعيد، لمصنع إيدج للملابس الجاهزة.",
    },
    content: {
      en: `The visit of Major General Adel Ghadhban, Governor of Port Said, to the Edge Factory for Ready-Made Garments on February 18, 2020.

During his visit, the Governor toured the production facilities and met with factory management to discuss the company's contribution to the local economy and employment opportunities for the youth of Port Said.

The Governor expressed his appreciation for the quality of work being produced at the facility and commended the management for their commitment to providing stable employment for local workers.

This visit underscored the strong relationship between Edge Garments and the local government, highlighting our role as a key contributor to the industrial development of the Port Said region.`,
      ar: `زيارة اللواء عادل الغضبان، محافظ بورسعيد، لمصنع إيدج للملابس الجاهزة في 18 فبراير 2020.

خلال زيارته، قام المحافظ بجولة في مرافق الإنتاج والتقى بإدارة المصنع لمناقشة مساهمة الشركة في الاقتصاد المحلي وفرص العمل لشباب بورسعيد.

أعرب المحافظ عن تقديره لجودة العمل المنتج في المنشأة وأشاد بالإدارة لالتزامها بتوفير عمل مستقر للعمال المحليين.

أكدت هذه الزيارة على العلاقة القوية بين إيدج للملابس والحكومة المحلية، مما يسلط الضوء على دورنا كمساهم رئيسي في التنمية الصناعية لمنطقة بورسعيد.`,
    },
    date: "November 12, 2020",
    category: {
      en: "News",
      ar: "أخبار",
    },
    image: "https://edgeforgarments.com/wp-content/uploads/2020/11/87025445_1791634644305092_4180343608236310528_n.jpg",
    gallery: [
      "https://edgeforgarments.com/wp-content/uploads/2020/11/86842068_1791634127638477_8843948724641071104_n.jpg",
      "https://edgeforgarments.com/wp-content/uploads/2020/11/86490451_1791634260971797_7128620348047622144_n.jpg",
      "https://edgeforgarments.com/wp-content/uploads/2020/11/86725992_1791634370971786_6716494201359433728_n.jpg",
    ],
  },
];

export default function BlogPage() {
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* Page Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
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
            <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="w-2 h-2 bg-[#1A4AFF] rounded-full animate-pulse" />
              <span className={`text-white/90 text-sm font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "آخر الأخبار والتحديثات" : "Latest News & Updates"}
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl text-white font-bold uppercase tracking-wide mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
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
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? "lg:grid-flow-dense" : ""}`}>
                <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl ${isRTL ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={featuredPost.image}
                    alt={isRTL ? featuredPost.title.ar : featuredPost.title.en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                    <span className={`inline-block bg-[#1A4AFF] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? "مميز" : "Featured"}
                    </span>
                  </div>
                </div>
                <div className={isRTL ? "text-right lg:col-start-1" : ""}>
                  <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={`text-[#1A4AFF] text-sm font-semibold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? featuredPost.category.ar : featuredPost.category.en}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className={`text-slate-500 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold text-[#122D8B] mb-4 group-hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? featuredPost.title.ar : featuredPost.title.en}
                  </h2>
                  <p className={`text-slate-600 text-lg leading-relaxed mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? featuredPost.excerpt.ar : featuredPost.excerpt.en}
                  </p>
                  <div className={`inline-flex items-center gap-2 text-[#1A4AFF] font-semibold group-hover:gap-3 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>
                      {isRTL ? "اقرأ المزيد" : "Read More"}
                    </span>
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
            <h2
              className={`text-2xl lg:text-3xl font-bold text-[#122D8B] mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              style={{ fontFamily: isRTL ? "var(--font-cairo)" : "'Arial Black', 'Bebas Neue', sans-serif" }}
            >
              {isRTL ? "جميع المقالات" : "All Articles"}
            </h2>
            <div className={`flex items-center gap-2 text-slate-500`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className={`text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {blogPosts.length} {isRTL ? "مقالات" : "Articles"}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={isRTL ? post.title.ar : post.title.en}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className={`p-6 ${isRTL ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={`text-[#1A4AFF] text-xs font-semibold uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? post.category.ar : post.category.en}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className={`text-slate-400 text-xs ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {post.date}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold text-[#122D8B] mb-3 line-clamp-2 group-hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? post.title.ar : post.title.en}
                  </h3>
                  <p className={`text-slate-500 text-sm line-clamp-2 mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? post.excerpt.ar : post.excerpt.en}
                  </p>
                  <div className={`flex items-center gap-1 text-[#1A4AFF] text-sm font-medium group-hover:gap-2 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>
                      {isRTL ? "اقرأ المزيد" : "Read More"}
                    </span>
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

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-[#122D8B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-2xl mx-auto text-center ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {isRTL ? "ابق على اطلاع" : "Stay Updated"}
            </h2>
            <p className="text-white/70 text-lg mb-8">
              {isRTL 
                ? "تابعنا على وسائل التواصل الاجتماعي لمعرفة آخر الأخبار والتحديثات"
                : "Follow us on social media for the latest news and updates"}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/EDGE-Factory-For-Garments"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/edgegarments"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/edgegarments"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@edgegarments"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}

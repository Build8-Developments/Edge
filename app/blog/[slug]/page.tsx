"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar, Footer, Chatbot } from "../../components/layout";
import { useLanguage } from "../../context/LanguageContext";

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

export default function BlogPostPage() {
  const params = useParams();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";

  const post = blogPosts.find((p) => p.slug === params.slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 2);

  if (!post) {
    return (
      <main className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
        <Navbar />
        <section className="py-32 lg:py-48">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl font-bold text-[#122D8B] mb-4">
              {isRTL ? "المقال غير موجود" : "Post Not Found"}
            </h1>
            <Link href="/blog" className="text-[#1A4AFF] hover:underline">
              {isRTL ? "العودة للمدونة" : "Back to Blog"}
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const contentParagraphs = (isRTL ? post.content.ar : post.content.en).split("\n\n");

  return (
    <main className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <Image
          src={post.image}
          alt={isRTL ? post.title.ar : post.title.en}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className={`inline-block bg-[#1A4AFF] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? post.category.ar : post.category.en}
              </span>
              <span className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {post.date}
              </span>
            </div>
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? post.title.ar : post.title.en}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 mb-8 text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link href="/" className={`text-slate-500 hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <svg className={`w-4 h-4 text-slate-300 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/blog" className={`text-slate-500 hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "المدونة" : "Blog"}
            </Link>
            <svg className={`w-4 h-4 text-slate-300 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className={`text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? post.category.ar : post.category.en}
            </span>
          </nav>

          {/* Content */}
          <div className={`prose prose-lg max-w-none ${isRTL ? "text-right" : ""}`}>
            {contentParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-slate-700 text-lg leading-relaxed mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image Gallery */}
          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className={`text-xl font-bold text-[#122D8B] mb-6 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "معرض الصور" : "Photo Gallery"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.gallery.map((img, index) => (
                  <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={img}
                      alt={`${isRTL ? post.title.ar : post.title.en} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className={`mt-12 pt-8 border-t border-slate-200 ${isRTL ? "text-right" : ""}`}>
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className={`text-slate-600 font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "شارك المقال:" : "Share this article:"}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 hover:bg-[#1877F2] hover:text-white rounded-full flex items-center justify-center text-slate-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(isRTL ? post.title.ar : post.title.en)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 hover:bg-black hover:text-white rounded-full flex items-center justify-center text-slate-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 hover:bg-[#0A66C2] hover:text-white rounded-full flex items-center justify-center text-slate-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent((isRTL ? post.title.ar : post.title.en) + " " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-100 hover:bg-[#25D366] hover:text-white rounded-full flex items-center justify-center text-slate-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className={`text-2xl lg:text-3xl font-bold text-[#122D8B] mb-8 ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "مقالات ذات صلة" : "Related Articles"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={isRTL ? relatedPost.title.ar : relatedPost.title.en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className={`p-6 ${isRTL ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span className={`text-[#1A4AFF] text-xs font-semibold uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? relatedPost.category.ar : relatedPost.category.en}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className={`text-slate-400 text-xs ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {relatedPost.date}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold text-[#122D8B] mb-3 line-clamp-2 group-hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? relatedPost.title.ar : relatedPost.title.en}
                    </h3>
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
      )}

      <Footer />
      <Chatbot />
    </main>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, siteUrl, getDirection } from "../../../i18n/config";
import { getDictionary } from "../../../i18n/dictionaries";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Chatbot } from "../../components/layout/Chatbot";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface BlogPost {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  date: string;
  category: { en: string; ar: string };
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
      en: "The Prime Minister inspects the Edge factory for ready-to-wear clothes in Port Said.",
      ar: "رئيس الوزراء يتفقد مصنع إيدج للملابس الجاهزة في بورسعيد.",
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
    category: { en: "News", ar: "أخبار" },
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
      en: "The visit on the occasion of the inauguration of the new Edge Garment Factory.",
      ar: "زيارة بمناسبة افتتاح مصنع إيدج الجديد للملابس.",
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
    category: { en: "News", ar: "أخبار" },
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
      en: "The visit of the Governor to the Edge Factory for Ready-Made Garments.",
      ar: "زيارة المحافظ لمصنع إيدج للملابس الجاهزة.",
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
    category: { en: "News", ar: "أخبار" },
    image: "https://edgeforgarments.com/wp-content/uploads/2020/11/87025445_1791634644305092_4180343608236310528_n.jpg",
    gallery: [
      "https://edgeforgarments.com/wp-content/uploads/2020/11/86842068_1791634127638477_8843948724641071104_n.jpg",
      "https://edgeforgarments.com/wp-content/uploads/2020/11/86490451_1791634260971797_7128620348047622144_n.jpg",
      "https://edgeforgarments.com/wp-content/uploads/2020/11/86725992_1791634370971786_6716494201359433728_n.jpg",
    ],
  },
];


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/blog/${slug}`;

  return {
    title: isRTL ? `${post.title.ar} | إيدج للملابس` : `${post.title.en} | EDGE for Garments`,
    description: isRTL ? post.content.ar.slice(0, 160) : post.content.en.slice(0, 160),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/blog/${slug}`,
        ar: `${siteUrl}/ar/blog/${slug}`,
        "x-default": `${siteUrl}/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const contentParagraphs = (isRTL ? post.content.ar : post.content.en).split("\n\n");
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-white" dir={dir}>
      <Navbar locale={locale} dict={dict} />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={post.image} alt={isRTL ? post.title.ar : post.title.en} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#122D8B]/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-3xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className={`inline-block bg-[#1A4AFF] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? post.category.ar : post.category.en}
              </span>
              <span className={`text-white/70 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{post.date}</span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? post.title.ar : post.title.en}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <Link href={`/${locale}`} className={`text-slate-500 hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <svg className={`w-4 h-4 text-slate-300 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${locale}/blog`} className={`text-slate-500 hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
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
          <div className={`max-w-none ${isRTL ? "text-right" : ""}`}>
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className={`text-slate-600 text-base leading-8 mb-8 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
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
                    <Image src={img} alt={`${isRTL ? post.title.ar : post.title.en} - ${index + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <Link href={`/${locale}/blog`} className={`inline-flex items-center gap-2 text-[#1A4AFF] font-semibold hover:gap-3 transition-all ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{isRTL ? "العودة للمدونة" : "Back to Blog"}</span>
            </Link>
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
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={relatedPost.image} alt={isRTL ? relatedPost.title.ar : relatedPost.title.en} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className={`p-6 ${isRTL ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[#1A4AFF] text-xs font-semibold uppercase tracking-wider ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? relatedPost.category.ar : relatedPost.category.en}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className={`text-slate-400 text-xs ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>{relatedPost.date}</span>
                    </div>
                    <h3 className={`text-lg font-bold text-[#122D8B] mb-3 line-clamp-2 group-hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? relatedPost.title.ar : relatedPost.title.en}
                    </h3>
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
      )}

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}

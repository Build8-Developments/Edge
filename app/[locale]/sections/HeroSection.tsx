import Link from "next/link";
import { ArrowRightIcon } from "../../components/Icons";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        minHeight: "90vh",
        backgroundImage: `
          linear-gradient(rgba(18, 45, 139, 0.5), rgba(18, 45, 139, 0.55)),
          url('/hero-factory.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        {/* Accent Line */}
        <div className="w-16 h-1 bg-[#1A4AFF] mb-8 mx-auto" />

        <h1
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-8 font-extrabold uppercase ${
            isRTL ? "font-[var(--font-cairo)]" : ""
          }`}
          style={{
            fontFamily: isRTL ? "var(--font-cairo), sans-serif" : "'Manrope', sans-serif",
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            letterSpacing: isRTL ? "0" : "0.02em",
          }}
        >
          {dict.hero.title}
        </h1>

        <p
          className={`text-white/90 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${
            isRTL ? "font-[var(--font-cairo)]" : ""
          }`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        >
          {dict.hero.subtitle}
        </p>

        <Link
          href={`/${locale}/products`}
          className={`inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-semibold tracking-wide text-white rounded-full transition-all duration-300 hover:scale-105 ${
            isRTL ? "font-[var(--font-cairo)]" : ""
          }`}
          style={{
            background: "linear-gradient(135deg, #1A4AFF 0%, #3D5AFE 100%)",
            boxShadow: "0 4px 25px rgba(26, 74, 255, 0.4)",
          }}
        >
          {dict.hero.cta}
          <ArrowRightIcon className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </section>
  );
}

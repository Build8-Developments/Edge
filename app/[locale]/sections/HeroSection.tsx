"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

function AnimatedWord({ word, index, isVisible }: { word: string; index: number; isVisible: boolean }) {
  return (
    <span
      className={`inline-block transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {word}&nbsp;
    </span>
  );
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const titleWords = dict.hero.title.split(" ");
  const subtitleWords = dict.hero.subtitle.split(" ");

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY * 0.4);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      {/* Background with Parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 h-[130%]"
          style={{
            transform: `translateY(${scrollY}px)`,
            backgroundImage: `url('/hero-factory.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-[#122D8B]/55" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        {/* Accent Line */}
        <div
          className={`w-16 h-1 bg-[#1A4AFF] mb-8 mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />

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
          {titleWords.map((word, index) => (
            <AnimatedWord key={index} word={word} index={index} isVisible={isVisible} />
          ))}
        </h1>

        <p
          className={`text-white/90 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${
            isRTL ? "font-[var(--font-cairo)]" : ""
          }`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        >
          {subtitleWords.map((word, index) => (
            <AnimatedWord
              key={index}
              word={word}
              index={index + titleWords.length}
              isVisible={isVisible}
            />
          ))}
        </p>

        <Link
          href={`/${locale}/contact`}
          className={`inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-semibold tracking-wide border-2 border-white text-white rounded-full transition-all duration-500 hover:bg-white hover:text-[#122D8B] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          style={{
            transitionDelay: `${(titleWords.length + subtitleWords.length) * 150 + 300}ms`,
          }}
        >
          {dict.hero.cta}
        </Link>
      </div>
    </section>
  );
}

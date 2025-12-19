"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries";

const partners = [
  { id: 1, name: "Bershka", logo: "/assets/logos/Bershka-Logo.wine.png" },
  { id: 2, name: "Colin's", logo: "/assets/logos/colins_logo.jpeg" },
  { id: 3, name: "DeFacto", logo: "/assets/logos/ddrZXWxdKnWCthtq49D_Ommh20E.png" },
  { id: 4, name: "Flyon", logo: "/assets/logos/FLYON.jpg" },
  { id: 5, name: "Defacto", logo: "/assets/logos/images (1).png" },
  { id: 6, name: "Koton", logo: "/assets/logos/koton-vector-logo-free-download-11574091607w5koqophfy.png" },
  { id: 7, name: "LC Waikiki", logo: "/assets/logos/LC_Waikiki_logo.svg.png" },
  { id: 8, name: "Loft", logo: "/assets/logos/loft-vector-logo.png" },
  { id: 9, name: "Mavi", logo: "/assets/logos/Mavi_logo.svg.png" },
  { id: 10, name: "Pull&Bear", logo: "/assets/logos/Pull&Bear_logo.svg.png" },
  { id: 11, name: "Stradivarius", logo: "/assets/logos/Stradivarius_logo_2012.svg.png" },
  { id: 12, name: "Wrangler", logo: "/assets/logos/VoFiRdy9TCWs._UX300_TTW__.jpg" },
];

interface PartnersSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function PartnersSection({ locale }: PartnersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  // Intersection Observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // JavaScript-based infinite scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 1;

    const animate = () => {
      scrollPos += speed;
      // Reset when we've scrolled half (since we have duplicated content)
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }
      scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-[#F8F9FB] overflow-hidden">
      {/* Header */}
      <div className={`max-w-4xl mx-auto px-6 text-center mb-14 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <span className={`text-[#1A4AFF] text-xs font-semibold uppercase tracking-widest block mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
          {isRTL ? "شركاؤنا في النجاح" : "TRUSTED PARTNERS"}
        </span>
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-5 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
          {isRTL ? "نفتخر بثقة أكبر العلامات التجارية" : "Trusted by Leading Brands"}
        </h2>
        <p className={`text-[#122D8B]/60 text-lg max-w-2xl mx-auto ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
          {isRTL 
            ? "نتعاون مع أشهر العلامات التجارية العالمية لتقديم أفضل جودة في صناعة الملابس"
            : "We collaborate with world-renowned brands to deliver excellence in garment manufacturing"
          }
        </p>
      </div>

      {/* Logos Marquee - JavaScript Infinite Scroll */}
      <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8F9FB] to-transparent z-10 pointer-events-none" />
        
        <div className="overflow-hidden">
          <div ref={scrollRef} className="flex" style={{ width: "max-content" }}>
            {/* First set of logos */}
            {partners.map((partner) => (
              <div 
                key={`a-${partner.id}`}
                className="flex-shrink-0 bg-white rounded-2xl flex items-center justify-center p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 mx-2"
                style={{ width: "180px", height: "90px" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={60}
                  className="object-contain max-h-[60px] opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            {/* Second set - duplicate for seamless loop */}
            {partners.map((partner) => (
              <div 
                key={`b-${partner.id}`}
                className="flex-shrink-0 bg-white rounded-2xl flex items-center justify-center p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 mx-2"
                style={{ width: "180px", height: "90px" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={60}
                  className="object-contain max-h-[60px] opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

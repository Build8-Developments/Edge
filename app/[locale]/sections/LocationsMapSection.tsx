"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";

interface Location {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  country: string;
  countryAr: string;
  x: number;
  y: number;
  isHQ?: boolean;
}

const locations: Location[] = [
  {
    id: "egypt",
    nameEn: "Port Said, Egypt",
    nameAr: "بورسعيد، مصر",
    descEn: "Headquarters",
    descAr: "المقر الرئيسي",
    country: "Egypt",
    countryAr: "مصر",
    // Port Said - northeast Egypt on Mediterranean
    x: 56.5,
    y: 36,
    isHQ: true,
  },
  {
    id: "france",
    nameEn: "Paris, France",
    nameAr: "باريس، فرنسا",
    descEn: "European Partner",
    descAr: "الشريك الأوروبي",
    country: "France",
    countryAr: "فرنسا",
    // Paris - northern France
    x: 49.5,
    y: 28,
  },
];

interface LocationsMapSectionProps {
  locale: Locale;
}

export function LocationsMapSection({ locale }: LocationsMapSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [markersVisible, setMarkersVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Delay markers animation
          setTimeout(() => setMarkersVisible(true), 500);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#122D8B] mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          >
            {isRTL ? "شركاؤنا العالميون" : "Our Global Partners"}
          </h2>
          <p
            className={`text-[#122D8B]/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
          >
            {isRTL
              ? "نخدم عملاءنا عبر القارات، ونبني علاقات دائمة قائمة على الثقة والجودة."
              : "We proudly serve clients across continents, building lasting relationships based on trust and quality."}
          </p>
        </div>

        {/* Map Container */}
        <div
          className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto">
            {/* World Map SVG - Blue tinted */}
            <Image
              src="/map.svg"
              alt="World Map"
              fill
              className="object-contain"
              style={{ 
                filter: "brightness(0) saturate(100%) invert(16%) sepia(60%) saturate(2000%) hue-rotate(210deg) brightness(90%) contrast(95%)",
                opacity: 0.25
              }}
              priority
            />

            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 ${
                  markersVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{ 
                  left: `${location.x}%`, 
                  top: `${location.y}%`,
                  transitionDelay: `${index * 300}ms`
                }}
                onMouseEnter={() => setActiveLocation(location.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Outer pulse ring */}
                <span 
                  className="absolute inset-0 w-16 h-16 -m-5 rounded-full border-2 border-[#1A4AFF] animate-ping opacity-30"
                  style={{ animationDuration: "2s" }}
                />
                
                {/* Middle pulse ring */}
                <span 
                  className="absolute inset-0 w-12 h-12 -m-3 rounded-full bg-[#1A4AFF] animate-ping opacity-20"
                  style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}
                />
                
                {/* Marker body */}
                <div
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeLocation === location.id ? "scale-150" : "hover:scale-125"
                  }`}
                >
                  {/* Pin shape */}
                  <div 
                    className="w-6 h-6 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-[#1A4AFF] to-[#122D8B]"
                    style={{ boxShadow: "0 4px 15px rgba(26, 74, 255, 0.5)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  {/* Pin tail */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[#122D8B]"
                    style={{ marginTop: "-3px" }}
                  />
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-8 px-5 py-3 bg-white rounded-2xl shadow-xl border border-[#1A4AFF]/20 whitespace-nowrap transition-all duration-300 z-20 ${
                    activeLocation === location.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1A4AFF]" />
                    <p className={`text-[#122D8B] font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? location.nameAr : location.nameEn}
                    </p>
                  </div>
                  <p className={`text-sm text-[#1A4AFF] font-medium ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}>
                    {isRTL ? location.descAr : location.descEn}
                  </p>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
                </div>
              </div>
            ))}

            {/* Connection line with animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" preserveAspectRatio="none">
              {/* Glow effect */}
              <line
                x1={`${locations[0].x}%`}
                y1={`${locations[0].y}%`}
                x2={`${locations[1].x}%`}
                y2={`${locations[1].y}%`}
                stroke="#1A4AFF"
                strokeWidth="6"
                strokeLinecap="round"
                className={`transition-all duration-1000 blur-sm ${markersVisible ? "opacity-30" : "opacity-0"}`}
                style={{ transitionDelay: "600ms" }}
              />
              {/* Main line */}
              <line
                x1={`${locations[0].x}%`}
                y1={`${locations[0].y}%`}
                x2={`${locations[1].x}%`}
                y2={`${locations[1].y}%`}
                stroke="#1A4AFF"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeLinecap="round"
                className={`transition-all duration-1000 ${markersVisible ? "opacity-70" : "opacity-0"}`}
                style={{ transitionDelay: "600ms" }}
              />
            </svg>
          </div>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className={`flex items-center gap-4 p-5 bg-white rounded-2xl border-2 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl ${
                activeLocation === location.id 
                  ? "border-[#1A4AFF] shadow-lg shadow-[#1A4AFF]/10 scale-[1.02]"
                  : "border-gray-100 hover:border-[#122D8B]/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${
                isRTL ? "flex-row-reverse" : ""
              }`}
              style={{ transitionDelay: `${800 + index * 150}ms` }}
              onMouseEnter={() => setActiveLocation(location.id)}
              onMouseLeave={() => setActiveLocation(null)}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  activeLocation === location.id 
                    ? "bg-gradient-to-br from-[#1A4AFF] to-[#122D8B]"
                    : "bg-[#F0F4FF]"
                }`}
              >
                <svg 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    activeLocation === location.id ? "text-white" : "text-[#1A4AFF]"
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className={isRTL ? "text-right" : ""}>
                <p className={`text-[#122D8B] font-bold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? location.nameAr : location.nameEn}
                </p>
                <p className={`text-sm text-[#1A4AFF] font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? location.descAr : location.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

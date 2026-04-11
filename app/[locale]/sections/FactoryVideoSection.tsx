"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { getDirection, type Locale } from "../../i18n/config";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface FactoryVideoSectionProps {
  locale: Locale;
}

interface FactoryVideoItem {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
}

// Replace this list with your own channel video IDs whenever needed.
const factoryVideos: FactoryVideoItem[] = [
  {
    id: "l5pSoNNuVHc",
    title: {
      ar: "جولة تعريفية",
      en: "Corporate Overview",
    },
    description: {
      ar: "نظرة عامة على بيئة العمل والبنية التشغيلية داخل المصنع.",
      en: "A quick look at the factory environment and operational setup.",
    },
  },
  {
    id: "39RDa7TxQso",
    title: {
      ar: "التشغيل اليومي",
      en: "Daily Operations",
    },
    description: {
      ar: "لقطات من سير العمليات اليومية وجودة التنفيذ على أرض الواقع.",
      en: "Highlights from day-to-day operations and execution quality.",
    },
  },
  {
    id: "y_aDtES3Hb0",
    title: {
      ar: "خطوط الإنتاج",
      en: "Production Lines",
    },
    description: {
      ar: "استعراض آلية العمل داخل خطوط الإنتاج بمراحلها المختلفة.",
      en: "A focused look into the workflow across production stages.",
    },
  },
  {
    id: "BXBagbSvNr0",
    title: {
      ar: "الجودة والتجهيز",
      en: "Quality and Preparation",
    },
    description: {
      ar: "كيف نحافظ على معايير الجودة قبل التسليم النهائي.",
      en: "How quality standards are maintained before final delivery.",
    },
  },
];

export function FactoryVideoSection({ locale }: FactoryVideoSectionProps) {
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = isRTL ? "زُر مصنعنا" : "Visit our factory";
  const subtitle = isRTL
    ? "جولة سريعة داخل المصنع من خلال مجموعة فيديوهات"
    : "Explore the factory through a curated video slider";

  const activeVideo = factoryVideos[activeIndex];
  const isCurrentVideoPlaying = playingVideoId === activeVideo.id;

  const goToVideo = useCallback((index: number) => {
    const boundedIndex = (index + factoryVideos.length) % factoryVideos.length;
    setActiveIndex(boundedIndex);
    setPlayingVideoId(null);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % factoryVideos.length);
    setPlayingVideoId(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + factoryVideos.length) % factoryVideos.length);
    setPlayingVideoId(null);
  }, []);

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

  useEffect(() => {
    if (!isVisible || isHovered || playingVideoId) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % factoryVideos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, isHovered, playingVideoId]);

  return (
    <section ref={sectionRef} className="py-8 lg:py-10 bg-alabaster-grey" dir={dir}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-true-cobalt ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            <TypewriterTitle text={title} isVisible={isVisible} />
          </h2>
          <p className={`mt-3 text-true-cobalt/70 text-base md:text-lg ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {subtitle}
          </p>
        </div>

        {/* Video Slider */}
        <div
          className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
            {!isCurrentVideoPlaying ? (
              <>
                <Image
                  src={`https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`}
                  alt={isRTL ? activeVideo.title.ar : activeVideo.title.en}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-true-cobalt/25" />

                <div className={`absolute inset-x-0 bottom-0 p-5 md:p-7 text-white ${isRTL ? "text-right font-[var(--font-cairo)]" : ""}`}>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {isRTL ? activeVideo.title.ar : activeVideo.title.en}
                  </h3>
                  <p className="mt-2 text-white/85 text-sm md:text-base max-w-2xl leading-relaxed">
                    {isRTL ? activeVideo.description.ar : activeVideo.description.en}
                  </p>
                </div>

                <div className="absolute top-4 right-4 bg-black/45 text-white text-xs md:text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                  {activeIndex + 1} / {factoryVideos.length}
                </div>

                {/* Play button */}
                <button
                  onClick={() => setPlayingVideoId(activeVideo.id)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label={isRTL ? "تشغيل الفيديو" : "Play video"}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-true-cobalt rounded-full flex items-center justify-center shadow-2xl group-hover:bg-royal-azure group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={isRTL ? activeVideo.title.ar : activeVideo.title.en}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            <button
              onClick={goToPrevious}
              className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/45 text-white hover:bg-black/60 transition-colors flex items-center justify-center ${isRTL ? "right-4" : "left-4"}`}
              aria-label={isRTL ? "الفيديو السابق" : "Previous video"}
            >
              <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/45 text-white hover:bg-black/60 transition-colors flex items-center justify-center ${isRTL ? "left-4" : "right-4"}`}
              aria-label={isRTL ? "الفيديو التالي" : "Next video"}
            >
              <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {factoryVideos.map((video, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={video.id}
                  onClick={() => goToVideo(index)}
                  className={`group text-left ${isRTL ? "text-right" : ""}`}
                  aria-label={isRTL ? `عرض الفيديو ${index + 1}` : `Show video ${index + 1}`}
                >
                  <div className={`relative aspect-video rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${isActive ? "ring-2 ring-royal-azure scale-[1.02]" : "hover:scale-[1.01]"}`}>
                    <Image
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={isRTL ? video.title.ar : video.title.en}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 transition-colors ${isActive ? "bg-true-cobalt/20" : "bg-black/25 group-hover:bg-black/10"}`} />
                  </div>
                  <p className={`mt-2 text-sm md:text-[15px] text-true-cobalt line-clamp-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? video.title.ar : video.title.en}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-5">
            {factoryVideos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => goToVideo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-royal-azure w-8" : "bg-royal-azure/30 hover:bg-royal-azure/55 w-2.5"
                }`}
                aria-label={isRTL ? `انتقل إلى الفيديو ${index + 1}` : `Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

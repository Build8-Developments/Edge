"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface ValueCard {
  title: string;
  description: string;
  image: string;
}

interface WhySetsUsApartProps {
  isRTL: boolean;
}

export function WhySetsUsApart({ isRTL }: WhySetsUsApartProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const values: ValueCard[] = isRTL
    ? [
        {
          title: "الجودة",
          description: "نضمن أعلى المعايير في كل مرحلة من مراحل الإنتاج.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Our%20values%20_%20quality.jpg",
        },
        {
          title: "الابتكار",
          description: "نطور باستمرار تصاميم وتقنيات جديدة للبقاء في صدارة صناعة الدنيم.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Our%20values%20_%20innovation%20.jpg",
        },
        {
          title: "الاستدامة",
          description: "نحن ملتزمون بالتصنيع المسؤول بيئياً وأخلاقياً.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Flexibility%20.jpg",
        },
        {
          title: "رضا العملاء",
          description: "نركز على فهم وتلبية توقعات عملائنا.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Suctomer%20satisfaction.jpg",
        },
        {
          title: "النزاهة",
          description: "ندير أعمالنا بصدق وشفافية.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Integrity.jpg",
        },
        {
          title: "الموثوقية",
          description: "نسلم في الوقت المحدد، في كل مرة، لبناء الثقة مع كل طلب.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Our%20values%20%20_%20reliability%20.jpg",
        },
      ]
    : [
        {
          title: "Quality",
          description: "We ensure the highest standards in every stage of production.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Our%20values%20_%20quality.jpg",
        },
        {
          title: "Innovation",
          description: "We constantly develop new designs and techniques to stay ahead in the denim industry.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Our%20values%20_%20innovation%20.jpg",
        },
        {
          title: "Sustainability",
          description: "We are committed to environmentally responsible and ethical manufacturing.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Flexibility%20.jpg",
        },
        {
          title: "Customer Satisfaction",
          description: "We focus on understanding and meeting our clients' expectations.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Suctomer%20satisfaction.jpg",
        },
        {
          title: "Integrity",
          description: "We conduct our business with honesty and transparency.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Integrity.jpg",
        },
        {
          title: "Reliability",
          description: "We deliver on time, every time, building trust with every order.",
          image: "/assets/EDGE/Production%20process/What%20sets%20us%20apart%20in%20managing%20your%20production/Our%20values%20%20_%20reliability%20.jpg",
        },
      ];

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCards((prev) => new Set([...prev, index]));
              cardObserver.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-8 lg:py-10 bg-alabaster-grey">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={titleRef}
          className={`mb-8 text-center transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <TypewriterTitle
            text={isRTL ? "ما يميزنا في إدارة إنتاجك" : "What sets us apart in managing your production"}
            isVisible={titleVisible}
            className={`text-3xl md:text-4xl font-bold text-true-cobalt ${
              isRTL ? "font-[var(--font-cairo)]" : ""
            }`}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`group relative rounded-3xl overflow-hidden aspect-square transition-all duration-700 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <Image
                src={value.image}
                alt={value.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-true-cobalt/80 transition-all duration-500 group-hover:bg-true-cobalt/90" />
              
              {/* Content */}
              <div className={`absolute inset-0 p-8 flex flex-col justify-end ${isRTL ? "text-right" : ""}`}>
                <h3
                  className={`text-white text-xl font-bold mb-2 transition-transform duration-500 group-hover:-translate-y-2 ${
                    isRTL ? "font-[var(--font-cairo)]" : ""
                  }`}
                >
                  {value.title}
                </h3>
                <p
                  className={`text-white/80 text-sm transition-all duration-500 group-hover:text-white ${
                    isRTL ? "font-[var(--font-cairo)]" : ""
                  }`}
                >
                  {value.description}
                </p>
                
                {/* Animated line */}
                <div
                  className={`h-0.5 bg-royal-azure mt-4 transition-all duration-500 origin-left group-hover:w-full ${
                    visibleCards.has(index) ? "w-12" : "w-0"
                  } ${isRTL ? "origin-right ml-auto" : ""}`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                />
              </div>

              {/* Corner accent */}
              <div
                className={`absolute top-4 w-8 h-8 border-t-2 border-royal-azure transition-all duration-500 ${
                  isRTL ? "right-4 border-r-2" : "left-4 border-l-2"
                } ${visibleCards.has(index) ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

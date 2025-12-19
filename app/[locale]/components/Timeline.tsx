"use client";

import { useEffect, useRef, useState } from "react";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: Milestone[];
  isRTL: boolean;
  title: string;
}

function TimelineItem({
  milestone,
  index,
  isRTL,
}: {
  milestone: Milestone;
  index: number;
  isRTL: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center gap-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${
        isRTL
          ? index % 2 === 0
            ? "lg:flex-row-reverse"
            : "lg:flex-row"
          : index % 2 === 0
          ? "lg:flex-row"
          : "lg:flex-row-reverse"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`absolute w-4 h-4 bg-[#1A4AFF] z-10 transition-transform duration-500 ${
          isVisible ? "scale-100" : "scale-0"
        } ${isRTL ? "right-8 lg:right-1/2 translate-x-1/2" : "left-8 lg:left-1/2 -translate-x-1/2"}`}
      />

      <div
        className={`lg:w-1/2 ${
          isRTL
            ? `pr-20 lg:pr-0 ${index % 2 === 0 ? "lg:pl-16 lg:text-left" : "lg:pr-16 lg:text-right"}`
            : `pl-20 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`
        }`}
      >
        <div className="text-[#1A4AFF] font-bold text-2xl mb-2">{milestone.year}</div>
        <h3 className={`text-[#122D8B] font-bold text-lg mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
          {milestone.title}
        </h3>
        <p className={`text-[#122D8B]/60 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
          {milestone.description}
        </p>
      </div>
    </div>
  );
}

export function Timeline({ milestones, isRTL, title }: TimelineProps) {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
            {title}
          </h2>
        </div>

        <div className="relative">
          <div
            className={`absolute top-0 bottom-0 w-0.5 bg-[#B6C6E1] ${
              isRTL ? "right-8 lg:right-1/2" : "left-8 lg:left-1/2"
            }`}
          />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <TimelineItem key={milestone.year} milestone={milestone} index={index} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

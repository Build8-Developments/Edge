"use client";

import { useState } from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string | null;
}

interface TeamCarouselProps {
  members: TeamMember[];
  isRTL: boolean;
  title: string;
  subtitle: string;
}

export function TeamCarousel({
  members,
  isRTL,
  title,
  subtitle,
}: TeamCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMember = members[activeIndex];

  return (
    <section className="py-20 lg:py-32 bg-[#F8F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center`}
        >
          {/* Text Content - Left side for RTL, Right side for LTR */}
          <div className={isRTL ? "text-right lg:order-1" : "lg:order-1"}>
            <p
              className={`text-[#1A4AFF] font-semibold mb-3 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {subtitle}
            </p>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#122D8B] mb-6 leading-tight ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {title}
            </h2>
            <p
              className={`text-[#122D8B]/60 text-lg mb-8 leading-relaxed ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
            >
              {isRTL
                ? "فريقنا من الخبراء المتخصصين يعملون معاً لتقديم أفضل المنتجات والخدمات لعملائنا."
                : "Our team of dedicated experts work together to deliver the best products and services to our clients."}
            </p>

            {/* Active Member Card with Image */}
            <div
              className={`flex items-center gap-5 p-5 bg-white rounded-2xl shadow-lg border border-[#122D8B]/5 ${isRTL ? "justify-end" : ""}`}
            >
              {/* Text - on left */}
              <div className={isRTL ? "text-right" : ""}>
                <h3
                  className={`text-xl font-bold text-[#122D8B] mb-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  {activeMember?.name}
                </h3>
                <p
                  className={`text-[#1A4AFF] font-medium text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  {activeMember?.role}
                </p>
              </div>
              {/* Member Image - on right */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                {activeMember?.image ? (
                  <Image
                    src={activeMember.image}
                    alt={activeMember.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#122D8B] to-[#1A4AFF] flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {activeMember?.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Dots */}
            <div
              className={`flex items-center gap-3 mt-8 ${isRTL ? "justify-end" : ""}`}
            >
              {members.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-[#1A4AFF]"
                      : "w-2.5 bg-[#122D8B]/20 hover:bg-[#122D8B]/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Team Cards - Right side for RTL, Left side for LTR */}
          <div
            className={`flex items-center justify-center gap-3 md:gap-4 h-[360px] md:h-[470px] lg:order-2`}
            style={{
              flexDirection: isRTL ? "row" : "row",
            }}
          >
            {members.map((member, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="relative cursor-pointer overflow-hidden shadow-lg rounded-2xl"
                  style={{
                    width: isActive ? "280px" : "85px",
                    height: isActive ? "450px" : "380px",
                    filter: isActive ? "none" : "grayscale(100%)",
                    transition: "width 0.3s ease, height 0.3s ease, filter 0.3s ease",
                    zIndex: isActive ? 10 : 1,
                    borderRadius: isActive ? "24px" : "16px",
                  }}
                >
                  {/* Image */}
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#122D8B] to-[#1A4AFF] flex items-center justify-center">
                      <span
                        className="text-white font-bold"
                        style={{
                          fontSize: isActive ? "3.5rem" : "1.25rem",
                          transition: "font-size 0.3s ease",
                        }}
                      >
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(18, 45, 139, 0.8), transparent, transparent)"
                        : "rgba(18, 45, 139, 0.3)",
                      transition: "background 0.3s ease",
                    }}
                  />

                  {/* Content - Only show on active */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0)" : "translateY(16px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    <h3
                      className={`text-base md:text-lg font-bold text-white mb-0.5 ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-white/70 text-xs ${isRTL ? "font-[var(--font-cairo)] text-right" : ""}`}
                    >
                      {member.role}
                    </p>
                  </div>

                  {/* Vertical Name - Only show on inactive */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <p
                      className="text-white font-semibold text-[10px] md:text-xs tracking-wide whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {member.name.split(" ")[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

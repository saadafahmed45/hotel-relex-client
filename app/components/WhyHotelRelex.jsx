import React from "react";
import { WHY_HOTEL_RELEX } from "../../lib/data";

export default function WhyHotelRelex() {
  return (
    <section className="py-24 lg:py-36 bg-charcoal text-white overflow-hidden relative">
      {/* Subtle ambient luxury texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
              OUR HOSPITALITY PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Why Hotel Relex
            </h2>
          </div>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-md leading-relaxed">
            Quiet luxury, refined aesthetics, and an unwavering commitment to personal comfort guide our philosophy.
          </p>
        </div>

        {/* 01 to 05 Numbered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10 pt-4">
          {WHY_HOTEL_RELEX.map((item, index) => (
            <div
              key={item.number}
              className={`space-y-4 pt-6 lg:pt-0 ${index > 0 ? "lg:pl-6" : ""}`}
            >
              <span className="font-serif text-3xl sm:text-4xl text-gold/80 font-light block">
                {item.number}
              </span>
              <h3 className="font-serif text-xl text-white font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { GUEST_REVIEWS } from "../../lib/data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? GUEST_REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === GUEST_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const review = GUEST_REVIEWS[currentIndex];

  return (
    <section className="py-24 lg:py-36 bg-stone-100 border-b border-stone-border overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
            GUEST EXPERIENCES & REPUTATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
            What Our Guests Say
          </h2>
        </div>

        {/* Editorial Spacious Quote Box */}
        <div className="relative py-8 sm:py-12 px-6 sm:px-16 bg-white border border-stone-200 rounded-sm shadow-sm space-y-8">
          {/* Quote Icon watermark */}
          <div className="flex justify-center text-gold/25">
            <Quote className="w-12 h-12 rotate-180" />
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1.5 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          {/* Quote Text */}
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal font-light leading-relaxed italic max-w-3xl mx-auto">
            "{review.quote}"
          </blockquote>

          {/* Guest Identity */}
          <div className="flex flex-col items-center justify-center gap-3 pt-4 border-t border-stone-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-200 shadow-sm">
              <Image
                src={review.avatar}
                alt={review.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-serif text-lg font-semibold text-charcoal block">
                {review.author}
              </span>
              <span className="text-xs font-sans text-charcoal-muted uppercase tracking-wider block">
                {review.location} • Stayed in {review.roomStayed}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-stone-300 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal transition shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-xs font-mono text-charcoal-muted">
              {currentIndex + 1} / {GUEST_REVIEWS.length}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-stone-300 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal transition shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

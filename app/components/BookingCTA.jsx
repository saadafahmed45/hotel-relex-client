"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import BookingModal from "./BookingModal";

export default function BookingCTA() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="relative py-28 lg:py-40 bg-charcoal text-white overflow-hidden">
        {/* Full-width dramatic photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2400&q=90"
            alt="Hotel Relex Night Luxury Suite"
            fill
            sizes="100vw"
            className="object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/75 to-charcoal-950/80" />
        </div>

        {/* Narrative & Conversion Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] font-subheading tracking-[0.25em] text-white/90 font-medium">
              RESERVE YOUR BESPOKE EXPERIENCE
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.12]">
            Your Next Escape <br />
            <span className="italic text-gold-light">Starts Here.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 font-light max-w-xl mx-auto leading-relaxed">
            Experience comfort, elegance, and exceptional hospitality at Hotel Relex. Secure your preferred dates with best available rates and exclusive arrival amenities.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full sm:w-auto px-10 py-4 bg-white text-charcoal hover:bg-gold hover:text-white uppercase tracking-[0.2em] text-xs font-medium rounded-sm transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group"
            >
              <span>Book Your Stay</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#rooms"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 uppercase tracking-[0.2em] text-xs font-medium rounded-sm transition flex items-center justify-center"
            >
              View Sanctuaries
            </a>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}

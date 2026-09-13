"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import BookingBar from "./BookingBar";
import BookingModal from "./BookingModal";

export default function Hero() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=90"
            alt="Hotel Relex Grand Coastal View"
            fill
            priority
            className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Dark Luxury Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-charcoal-950/60" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Narrative Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center my-auto">
          <div className="space-y-5 sm:space-y-7">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] sm:text-xs font-subheading tracking-[0.25em] text-white/95 font-medium">
                HOTEL RELEX SANCTUARY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.08] tracking-tight text-balance">
              Where Comfort Meets <br />
              <span className="italic font-light text-gold-light">Exceptional</span> Hospitality.
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/85 font-light leading-relaxed font-sans text-balance">
              Experience thoughtfully designed rooms, bespoke wellness rituals, and unforgettable coastal moments at Hotel Relex.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-charcoal hover:bg-gold hover:text-white transition-all duration-300 font-medium text-xs tracking-[0.2em] uppercase rounded-sm shadow-xl flex items-center justify-center gap-3 group"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/#rooms"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 transition-all duration-300 font-medium text-xs tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2"
              >
                <span>Explore Rooms</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Booking Bar at Bottom */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 lg:px-8 mt-12 sm:mt-16">
          <BookingBar />
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { SPECIAL_OFFERS } from "../../lib/data";
import BookingModal from "./BookingModal";

export default function OffersSection() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookOffer = (offer) => {
    setSelectedOffer(offer);
    setIsBookingOpen(true);
  };

  return (
    <>
      <section id="offers" className="py-24 lg:py-36 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-14">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
              CURATED PACKAGES & PRIVILEGES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
              Make Your Stay Extraordinary
            </h2>
            <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
              Tailored itineraries and seasonal privileges designed for romance, family holidays, and restorative escapes.
            </p>
          </div>

          {/* Offer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {SPECIAL_OFFERS.map((offer) => (
              <article
                key={offer.id}
                className="group relative flex flex-col bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Privilege Tag */}
                  <div className="absolute top-4 left-4 bg-charcoal/85 backdrop-blur-md px-3.5 py-1 rounded-sm text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                    {offer.tag}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-subheading tracking-widest text-charcoal-muted uppercase block">
                      {offer.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold group-hover:text-gold-dark transition-colors duration-200">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                      {offer.description}
                    </p>
                  </div>

                  {/* Inclusions */}
                  <div className="p-3.5 bg-stone-50 border border-stone-border rounded-sm text-xs text-charcoal font-medium">
                    <span className="text-[10px] font-subheading tracking-wider uppercase text-gold block mb-1">
                      Privilege Inclusions
                    </span>
                    {offer.inclusion}
                  </div>

                  {/* Validity & CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-stone-border">
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                      <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{offer.validity}</span>
                    </div>

                    <button
                      onClick={() => handleBookOffer(offer)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-charcoal hover:text-gold transition-colors duration-200"
                    >
                      <span>Reserve Package</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
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

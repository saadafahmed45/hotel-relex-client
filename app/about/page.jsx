import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Compass, Award } from "lucide-react";
import BookingCTA from "../components/BookingCTA";

export const metadata = {
  title: "About Us | Hotel Relex Heritage & Philosophy",
  description:
    "Learn about the philosophy, architectural vision, and bespoke hospitality standards that make Hotel Relex a destination of quiet luxury.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: Compass,
      title: "Architectural Harmony",
      desc: "Designed to blend with the natural topography, using raw limestone, warm oak, and acoustic craftsmanship.",
    },
    {
      icon: HeartHandshake,
      title: "Intuitive Hospitality",
      desc: "Service that anticipates desires before they are spoken, delivered with genuine warmth and discretion.",
    },
    {
      icon: ShieldCheck,
      title: "Sustainable Sanctuary",
      desc: "Zero-single-use plastics, organic coastal sourcing, solar energy integration, and local artisan patronage.",
    },
    {
      icon: Award,
      title: "Culinary Distinction",
      desc: "Award-winning gastronomic curation highlighting organic micro-farms and regional coastal fisheries.",
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-ivory">
      {/* Hero Banner */}
      <div className="relative h-[45vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=90"
          alt="Hotel Relex Architecture"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/40" />

        <div className="relative z-10 text-center px-6 max-w-3xl space-y-4">
          <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
            OUR STORY & HERITAGE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            The Philosophy of Quiet Luxury
          </h1>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
              SANCTUARY VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal leading-[1.15]">
              A sanctuary where <br />
              <span className="italic">time slows down.</span>
            </h2>
            <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
              Founded with the conviction that true luxury is neither loud nor hurried, Hotel Relex was crafted as a refuge of contemplation, sensory indulgence, and effortless comfort.
            </p>
            <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
              Situated along an untouched expanse of dramatic shoreline, every corridor, courtyard, and suite was positioned to capture the shifting tones of dawn and twilight. Our architectural team utilized limestone from regional quarries, bespoke brushed bronze fixtures, and tactile Belgian linens to ground the spaces in enduring tranquility.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-stone-200 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
                alt="Hotel Relex courtyard and reflecting pool"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="pt-24 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
              FOUNDATIONAL VALUES
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              What Defines Hotel Relex
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-white border border-stone-200 rounded-sm shadow-sm hover:shadow-lg transition space-y-4"
                >
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-charcoal">{item.title}</h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BookingCTA />
    </div>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { HOTEL_EXPERIENCES } from "../../lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 lg:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
            BESPOKE AMENITIES & LEISURE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
            More Than a Stay
          </h2>
          <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
            From rejuvenating dawn thermal waters to midnight sommelier pairings, immerse yourself in experiences crafted to awaken your senses.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOTEL_EXPERIENCES.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Large Image */}
              <div className="relative aspect-[16/11] overflow-hidden bg-stone-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                  <span className="text-[10px] font-subheading tracking-wider uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-sm">
                    {item.subtitle}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-white/80">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{item.hours}</span>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-charcoal font-semibold group-hover:text-gold-dark transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-charcoal group-hover:text-gold transition-colors duration-200"
                  >
                    <span>Inquire Experience</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

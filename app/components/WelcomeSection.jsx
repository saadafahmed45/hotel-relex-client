import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Luxury Architectural Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none overflow-hidden rounded-sm shadow-2xl border border-stone-200 image-zoom-container">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85"
                alt="Hotel Relex Architecture and Tranquil Pool"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Subtle floating badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white p-5 sm:p-6 shadow-xl border border-stone-border max-w-[240px] rounded-sm hidden sm:block">
              <div className="flex items-center gap-2 text-gold mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-subheading tracking-[0.2em] font-semibold text-charcoal">
                  ESTABLISHED 2024
                </span>
              </div>
              <p className="font-serif text-sm italic text-charcoal-muted leading-snug">
                "Where quiet luxury transforms every morning into a peaceful ceremony."
              </p>
            </div>
          </div>

          {/* RIGHT: Editorial Story & Typography */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="space-y-3">
              <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
                WELCOME TO HOTEL RELEX
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
                A stay designed <br className="hidden sm:block" />
                <span className="italic">around you.</span>
              </h2>
            </div>

            <div className="space-y-4 text-charcoal-muted font-light leading-relaxed text-sm sm:text-base">
              <p>
                Nestled where majestic coastal horizons meet timeless architectural elegance, Hotel Relex was envisioned as an antidote to the fast-paced modern world. We believe that true luxury lies in simplicity, space, and intuitive attentiveness.
              </p>
              <p>
                Every guest room has been sculpted using tactile stone, brushed bronze, and natural linen, creating a deeply restorative environment. From bespoke morning breakfasts tailored to your dietary wishes to twilight private spa sessions, our team ensures your time with us is seamless and unforgettable.
              </p>
            </div>

            {/* Features summary row */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-border">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold block">
                  38
                </span>
                <span className="text-xs font-subheading tracking-wider text-charcoal-muted uppercase">
                  Bespoke Suites
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold block">
                  100%
                </span>
                <span className="text-xs font-subheading tracking-wider text-charcoal-muted uppercase">
                  Ocean & Horizon Vistas
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-charcoal hover:text-gold transition group pb-1 border-b border-charcoal hover:border-gold"
              >
                <span>Discover Hotel Relex</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

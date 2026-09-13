import React from "react";
import Image from "next/image";
import { MapPin, Navigation, Plane, Compass, Sparkles, ArrowRight } from "lucide-react";

export default function LocationSection() {
  const pointsOfInterest = [
    { name: "International Airport (JFK)", distance: "28 min / 22 km", icon: Plane },
    { name: "Secluded Azure Cove & Beach", distance: "4 min walk / 350 m", icon: Compass },
    { name: "Historic Marina & Yacht Club", distance: "12 min drive / 8 km", icon: Navigation },
    { name: "Modern Arts & Cultural Pavilion", distance: "15 min drive / 11 km", icon: Sparkles },
  ];

  return (
    <section id="location" className="py-24 lg:py-36 bg-stone-100 border-t border-b border-stone-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Styled Map Graphic Preview */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/11] w-full rounded-sm overflow-hidden border border-stone-300 shadow-xl bg-stone-200">
              {/* Map satellite / styled luxury cartography aesthetic */}
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=85"
                alt="Hotel Relex Location Map"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-[1px]" />

              {/* Pin Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-gold opacity-75" />
                  <div className="relative w-10 h-10 rounded-full bg-charcoal text-gold border-2 border-gold flex items-center justify-center shadow-2xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-sm border border-stone-200 shadow-xl text-center">
                  <span className="font-serif text-xs font-semibold text-charcoal block">Hotel Relex</span>
                  <span className="text-[9px] uppercase tracking-wider text-charcoal-muted block">Bespoke Coastal Haven</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Location Details & Distances */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
                ARRIVALS & DESTINATION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
                Perfectlys <br className="hidden sm:block" />
                <span className="italic">Located.</span>
              </h2>
            </div>

            <div className="space-y-2 text-sm text-charcoal-muted font-light leading-relaxed">
              <p>
                Perched gracefully on the serene coastline, Hotel Relex provides absolute acoustic tranquility while remaining effortlessly connected to fine dining, yacht harbors, and international transit terminals.
              </p>
              <p className="font-serif text-base text-charcoal font-medium pt-2">
                108 Ocean Boulevard, Seaside Sanctuary Bay, NY 11964
              </p>
            </div>

            {/* Nearby Distances */}
            <div className="space-y-3 pt-2 border-t border-stone-border">
              {pointsOfInterest.map((poi) => {
                const IconComponent = poi.icon;
                return (
                  <div key={poi.name} className="flex items-center justify-between text-xs py-2 border-b border-stone-200">
                    <div className="flex items-center gap-2.5 text-charcoal">
                      <IconComponent className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="font-medium">{poi.name}</span>
                    </div>
                    <span className="text-charcoal-muted font-mono">{poi.distance}</span>
                  </div>
                );
              })}
            </div>

            {/* Action */}
            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-charcoal text-white hover:bg-black uppercase tracking-[0.2em] text-xs font-medium rounded-sm transition shadow-sm"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

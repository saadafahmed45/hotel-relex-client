import React from "react";
import Link from "next/link";
import Image from "next/image";
import { hotelsData } from "../api/api";
import { Users, Bed, Maximize2, ArrowRight } from "lucide-react";
import BookingCTA from "../components/BookingCTA";

export const metadata = {
  title: "Sanctuaries & Suites | Hotel Relex",
  description: "Explore our collection of luxury rooms and architectural suites, crafted with natural stone, warm oak, and expansive ocean vistas.",
};

export default async function RoomsPage() {
  const rooms = await hotelsData();

  return (
    <div className="pt-28 pb-20 bg-ivory">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 text-center space-y-4">
        <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
          HOTEL RELEX ACCOMMODATIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-normal">
          Rooms & Signature Suites
        </h1>
        <p className="max-w-2xl mx-auto text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
          Each sanctuary at Hotel Relex is conceived as a tranquil residential retreat, balancing tactile natural materials with contemporary acoustic stillness and panoramic coastal horizons.
        </p>
      </div>

      {/* Rooms Showcase */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {rooms.map((room) => (
            <article
              key={room._id}
              className="group flex flex-col bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-stone-200 text-right shadow-sm">
                  <span className="font-serif text-base font-bold text-charcoal block">
                    ${room.price}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block font-sans">
                    Per Night
                  </span>
                </div>

                {room.category && (
                  <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] uppercase tracking-[0.15em] text-white font-medium">
                    {room.category}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-2xl text-charcoal font-semibold group-hover:text-gold-dark transition-colors duration-200">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light line-clamp-2">
                    {room.shortDescription || room.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-border text-xs text-charcoal-muted">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="truncate">{room.guests || "2 Guests"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="truncate">{room.bed || "King Bed"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="truncate">{(room.size || "50 m²").split("/")[0]}</span>
                  </div>
                </div>

                {/* Link */}
                <div className="pt-1">
                  <Link
                    href={`/rooms/${room.slug || room._id}`}
                    className="w-full py-3 bg-stone-100 hover:bg-charcoal text-charcoal hover:text-white uppercase tracking-[0.18em] text-xs font-medium rounded-sm transition-colors duration-300 flex items-center justify-center gap-2 border border-stone-border"
                  >
                    <span>Discover Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BookingCTA />
    </div>
  );
}

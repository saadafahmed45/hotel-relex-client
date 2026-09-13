"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Bed, Maximize2, ArrowRight, Sparkles } from "lucide-react";
import { LUXURY_ROOMS } from "../../lib/data";
import BookingModal from "./BookingModal";

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Rooms", "Suites", "Signature"];

  const filteredRooms =
    activeCategory === "All"
      ? LUXURY_ROOMS
      : LUXURY_ROOMS.filter((room) => room.category === activeCategory);

  const handleQuickBook = (room) => {
    setSelectedRoom(room);
    setIsBookingOpen(true);
  };

  return (
    <>
      <section id="rooms" className="py-24 lg:py-36 bg-stone-50 border-t border-b border-stone-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12 sm:space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
                SANCTUARIES & SUITES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
                Stay in Comfort
              </h2>
              <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
                Thoughtfully designed spaces for rest, relaxation, and unforgettable stays. Each room features panoramic horizons and bespoke natural finishes.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-charcoal text-white shadow-sm"
                      : "bg-white text-charcoal-muted hover:text-charcoal border border-stone-border hover:border-stone-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredRooms.map((room) => (
              <article
                key={room._id}
                className="group flex flex-col bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Container with Zoom & Floating Price */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-stone-200 text-right shadow-sm">
                    <span className="font-serif text-base font-bold text-charcoal block">
                      ${room.price}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block font-sans">
                      Per Night
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] uppercase tracking-[0.15em] text-white font-medium">
                    {room.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-2xl text-charcoal font-semibold group-hover:text-gold-dark transition-colors duration-200">
                      {room.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light line-clamp-2">
                      {room.shortDescription}
                    </p>
                  </div>

                  {/* Specifications Meta Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-border text-xs text-charcoal-muted">
                    <div className="flex items-center gap-1.5" title="Max Guests">
                      <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="truncate">{room.guests}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Bed Type">
                      <Bed className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="truncate">{room.bed}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Room Dimensions">
                      <Maximize2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="truncate">{room.size.split("/")[0]}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <Link
                      href={`/rooms/${room.slug || room._id}`}
                      className="text-xs uppercase tracking-[0.16em] font-medium text-charcoal hover:text-gold transition flex items-center gap-1.5 py-1"
                    >
                      <span>View Room</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <button
                      onClick={() => handleQuickBook(room)}
                      className="px-4 py-2 bg-stone-100 hover:bg-charcoal text-charcoal hover:text-white transition-colors duration-300 text-xs uppercase tracking-wider font-medium rounded-sm border border-stone-border"
                    >
                      Quick Book
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center pt-4">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white hover:bg-black uppercase tracking-[0.2em] text-xs font-medium rounded-sm transition shadow-sm"
            >
              <span>Explore All Suites & Sanctuaries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoom={selectedRoom}
      />
    </>
  );
}

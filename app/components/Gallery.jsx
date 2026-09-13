"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY_ITEMS } from "../../lib/data";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ["All", "Rooms", "Dining", "Pool", "Interior", "Exterior", "Experiences"];

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section id="gallery" className="py-24 lg:py-36 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
                VISUAL STORYTELLING
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
                Hotel Gallery
              </h2>
              <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
                Glimpse the refined textures, natural coastal light, and quiet serenity that define Hotel Relex.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
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

          {/* Masonry / Dynamic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className={`group relative overflow-hidden bg-stone-200 cursor-pointer rounded-sm border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500 image-zoom-container ${
                  item.size === "tall"
                    ? "aspect-[3/4] sm:row-span-2"
                    : item.size === "wide"
                    ? "aspect-[16/10]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />

                {/* Ambient Hover Overlay */}
                <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-subheading tracking-widest uppercase text-gold block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-xl text-white font-medium">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-[110] bg-charcoal/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-20 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-20 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image View */}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-4">
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="text-center pt-4 space-y-1">
              <span className="text-[10px] font-subheading tracking-widest uppercase text-gold">
                {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-20 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
